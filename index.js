
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//Enable CORS
const cors = require('cors');
app.use(cors());

//Http Request Logger
// const morgan = require('morgan');
// app.use(morgan('combined'));

// Connect to DB
const db=require('./config/db');
db.connect();

//Parsing data received from client
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//import model
// const Product = require('../models/Product');

// var storage = multer.diskStorage({
//     destination: "images", 
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}--${file.originalname}`);
//         // console.log(file.originalname)
//     }
// })
// maxSize = 10*1024*1024
// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: maxSize
//     }
// }).single("file")

// app.post("/upload", (req, res)=>{
//     upload(req, res, err =>{
//         if(err){
//             res.json({message: err.message})
//         }
//         else{
//             //Insert Data into DB
//             let productInfo =   new  Product({
//                 name: req.body.name,
//                 category: req.body.category,
//                 label: req.body.label,
//                 thumbPath: req.file.filename,
//                 weight: req.body.weight,
//                 color: req.body.color,
//                 price: req.body.price,
//                 description: req.body.description,
//                 benefit: req.body.benefit,
//                 instruction: req.body.instruction
//             })

//              productInfo.save()
// // chuwa
//             res.json({message: "Success"});
//             // console.log(("file receive: ", req.file.filename))
//         }
//     })
// })


//api get all products
// app.get("/products", async (req, res) => {
// try {
//     let products = await Product.find();
//     res.json(products);
// } catch (error) {
//     res.json({Message:   error.message})
// }
// })

//api get product info
// app.get('/products/:id', async (req, res) => {
//     try {
//         let productInfo = await Product.findById(req.params.id);
//         res.json(productInfo);
//     } catch (err) {
//         res.json({message : err.message})
//     }
// })
app.use(express.static(path.join(__dirname, '/images')))

//Import Product Routing
const productRouter = require('./routes/Product');
app.use('/', productRouter);

//Import User Routing
const userRouter = require('./routes/User');
app.use('/users', userRouter);

//Import Admin Routing
const adminRouter = require('./routes/Admin');
app.use('/admins', adminRouter);

//import auth routing
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`My server listening on port ${port}`);
});
