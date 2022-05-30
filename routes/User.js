const express = require('express');
const router = express.Router();
const middlewareController = require('../controllers/middlewareController');

//import model
const User = require('../models/User.js');


//Router config
//Rendering HomePage
router.get('/', (req,res)=>{
    res.send("OK.....");
});

// if (!mongoose.Types.ObjectId.isValid(id) )  return false;

//get all users
router.get('/users',middlewareController.verifyToken,(req,res)=>{
    User.find({})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json({"Error":error.message}) })
});

//get user by id
router.get('/:userId', async(req, res) => {
    // console.log(req.params.id);
    // res.send("Server received data!");
    try {
        let data = await User.findById(req.params.userId);
        res.json(data);
    } catch (err) {
        res.json({ "Error": err.message });
    }
})

//insert new user
router.post('/user',async(req,res)=>{
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        phonenumber: req.body.phonenumber,
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
//update User Info
router.patch("/:id", async(req,res)=>{
    try {
        await User.updateOne({_id: req.params.id},{
            $set:{
                email: req.body.email,
                password: req.body.password,
                fullName: req.body.fullName,
                phonenumber: req.body.phonenumber,
                address: req.body.address
            }
        })
        res.json({ message: "Success" });
    } catch (error) {
        res.json({message:error.message});
    }
})

//Delete User
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, async(req,res)=>{
    try{
        await User.remove({_id:req.params.id});
        res.json({ message: "Success" });
    }catch(err){
        res.json({message:err.message});
    }
})
module.exports = router;