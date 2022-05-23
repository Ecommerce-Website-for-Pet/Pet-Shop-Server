const express = require('express');
const router = express.Router();

//import model
const User = require('../models/User.js');
const { route } = require('./Product.js');

//Router config
//Rendering HomePage
router.get('/', (req,res)=>{
    res.send("OK.....");
});

// if (!mongoose.Types.ObjectId.isValid(id) )  return false;

//get users
router.get('/users',(req,res)=>{
    User.find({})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json({"Error":error.message}) })
});

//insert new user
router.post('/user',async(req,res)=>{
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    }) 
    try {
        let u = await user.save();
        res.json({message: "Success"})
    } catch (error) {
        res.json({message:err.message});
    }
    ;
})
// //update User Info
// router.patch("/:id", async(req,res)=>{
//     try {
//         await User.updateOne({_id: req.params.id},{
//             $set:{
//                 email: req.body.email,
//                 password: req.body.password,
//                 fullName: req.body.fullName,
//                 phoneNumber: req.body.phoneNumber,
//                 address: req.body.addres
//             }
//         })
//         res.json({ message: "success" });
//     } catch (error) {
//         res.json({message:error.message});
//     }
// })

// //Delete User
// router.delete("/:id",async(req,res)=>{
//     try{
//         await User.remove({_id:req.params.id});
//         res.json({ message: "success" });
//     }catch(err){
//         res.json({message:err.message});
//     }
// })
module.exports = router;