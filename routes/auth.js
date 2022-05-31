const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const middlewareController = require('../controllers/middlewareController');
const bcrypt = require('bcrypt');

// const users = [];

// const passport = require('passport');
// const initializePassport = require('../config/db/passport');
// initializePassport(
//     passport, 
//     email=> users.find(user=>user.email === email)
// );

// const flash = require('express-flash');
// const session = require('express-session');
// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize());
// app.use(session());




//arr push refreshtoken thay cho db
let refreshTokens =[];
// register
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
    res.redirect('/login');
} catch (err) {
    res.status(500).json(err);
    res.redirect('/register');
}
}),


//login user
router.post('/login',
// password.authenticate('local',{
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
 async(req,res)=>{
try {
    const user = await User.findOne({email: req.body.email});
    if(!user){
       return res.status(404).json("Wrong Email!")
    }
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
       return res.status(404).json("Wrong Password!")
    }
    if(user && validPassword){
        const accessToken = jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn:"2h"}
        );

        const refreshToken = jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_REFRESH_KEY,{
            expiresIn:"365d",
        })
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: false,
path: "/",
sameSite: "strict"
        })
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
        console.log("dang nhap thanh cong")
        res.redirect('/home');
    }
} catch (err) {
    res.status(500).json(err)
 }
}
)


//refresh
router.post('/refresh', async(req,res)=>{
try {
    //take refresh token from users
    const refreshToken = req.cookies.refreshToken;
    res.status(200).json(refreshToken)
    if(!refreshToken) return res.status(401).json("You're not authenticated");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid")
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY,(err,user)=>{
        if(err){
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token)=>token !== refreshToken);

        //create new accessToken, refresh token
        const newAccessToken = jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn:"2h"}
        );

        const newRefreshToken =jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn:"365d"}
        );
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken",newRefreshToken,{
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        
    })
    res.status(200).json({accessToken: newAccessToken});
} catch (err) {
    res.status(500).json(err)
}   
})

//logout
router.post('/logout',middlewareController.verifyToken, async(req,res)=>{
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json("Logged out !")
})

module.exports = router;