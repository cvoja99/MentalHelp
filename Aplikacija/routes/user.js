const express = require('express');
const {User} = require('../models');
const router = express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config = require('config');
router.post("/", async(req,res) =>{
const { tip, email, password,username} = req.body
try{
    if(password=='')
    throw "Password cannot be empty";
    const tryemail=await User.findOne({where:{email}});
    if (tryemail!=null){
        throw "User already exists!";
    }
    const tryuser=await User.findOne({where:{username}});
    if (tryuser!=null){
        throw "User already exists!"
    }
    const salt=await bcrypt.genSalt(10);
    const pass=await bcrypt.hash(password,salt);
    const user = await User.create({tip, email,password:pass,username});
    
    const payload={
        user:{
            id:user.id
        }
    }
    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token)=>{
            if (err)throw err;
            console.log(token);
            res.json({token});}
    );
    return res.json(user);
}catch(err){
    console.log(err);
    if (typeof err==="string")
    {return res.status(500).json({message:err});}
    if(err.errors[0].message==='Validation isEmail on email failed')
    {return res.status(500).json({message:'Email is not valid'});}
    if(err.errors[0].message==='Validation notEmpty on username failed')
    {return res.status(500).json({message:'Username cannot be empty'});}
    if(err.errors[0].message==='Validation notEmpty on password failed')
    {return res.status(500).json({message:'Password cannot be empty'});}
    return res.status(500).json(err);
}})
router.get("/:id", async(req,res) =>{
    try{
        id=req.params.id;
        const users = await User.findOne({where:{id}});
        return res.json(users);
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.put("/:id", async(req,res) =>{
    const id = req.params.id;
    const { tip, email, username} = req.body;
    try{
        const tryemail=await User.findOne({email});
        if (tryemail!=null){
            throw "User already exists!";
        }
        const tryuser=await User.findOne({username});
        if (tryuser!=null){
            throw "User already exists!";
        }
        const user = await User.findOne({
            where: {id}
        });
        user.tip = tip;
        user.email = email;
        user.username = username;
        await user.save();
        return res.json(user);

    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.put("/change_password", async(req,res) =>{
    const id = req.params.id;
    const { password} = req.body;
    try{
        const user = await User.findOne({
            where: {id}
        });
        user.password = password;
        await user.save();
        return res.json(user);

    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.delete("/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id}
        });
        await user.destroy();
        return res.json({message: "User Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
module.exports=router;