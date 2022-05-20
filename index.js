const express = require('express');
const app = express();
const port = 3000;

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


//Import Product Routing
const productRouter = require('./routes/Product');
app.use('/products', productRouter);

//Import User Routing
const userRouter = require('./routes/User');
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`My server listening on port ${port}`);
});
