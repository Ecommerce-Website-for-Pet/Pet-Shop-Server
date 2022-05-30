const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const bcrypt = require('bcrypt');
router.post('/register', async(req,res)=>{
try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password,salt);

    //create new user
    const newUser = await new User({
        email: req.body.email,
        password: hashed,
        fullName: req.body.fullName,
        phonenumber: req.body.phonenumber,
        address: req.body.address
    });

    //save to database
    const user = await newUser.save();
    res.status(200).json(user);
} catch (error) {
    res.status(500).json(err);
}
})

//login user
router.post('/login', async(req,res)=>{
try {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json("Wrong Email!")
    }
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        res.status(404).json("Wrong Password!")
    }
    if(user && validPassword){
        const accessToken = jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn:"2h"}
        );
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
    }
} catch (error) {
    res.status(500).json(err)
}
})
module.exports = router;