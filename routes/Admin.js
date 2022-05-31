const express = require('express');
const router = express.Router();

//Import model
const Admin = require('../models/Admin.js');

//Router config
//Rendering HomePage
router.get('/', (req,res)=>{
    res.send("OK.....");
});

//Get all admins
router.get('/admins',(req,res)=>{
    Admin.find({})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json({"Error":error.message}) })
});

//Get admin by id
router.get('/:adminId', async(req,res)=>{
    // console.log(req.params.id);
    // res.send("Server received data!");
    try{
        let data = await Admin.findById(req.params.adminId);
        res.json(data);
    }catch(err){
        res.json({message:err.message});
    }
})

//Insert new admin
router.post("/admin",async(req,res)=>{
    // console.log("Data from client:", req.body);
    // res.send("Server received data!");
    let admin = new Admin({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        phonenumber: req.body.phonenumber,
        address: req.body.address
    })
    try{
        let p = await admin.save();
        // res.json({status: 200,data: p});
        res.json({ message: "success" });
    }catch(err){
        res.json({message:err.message});
    }
})

//Update admin
router.patch("/:id",async(req,res)=>{
    try{
        await Admin.updateOne({_id: req.params.id}, {
            $set:{
                email: req.body.email,
                password: req.body.password,
                fullName: req.body.fullName,
                phonenumber: req.body.phonenumber,
                address: req.body.address
            }
        })
        res.json({ message: "success" });
    }catch(err){
        res.json({message:err.message});
    }
});

//Delete admin
router.delete("/:id",async(req,res)=>{
    try{
        await Admin.remove({_id:req.params.id});
        res.json({ message: "success" });
    }catch(err){
        res.json({message:err.message});
    }
})

module.exports = router;