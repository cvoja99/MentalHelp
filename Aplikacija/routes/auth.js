const express =require("express");
const router= express.Router();
const auth=require("../middleware/auth");
const bcrypt=require('bcryptjs');
const User=require('../models').User;
const config = require('config');
const jwt=require("jsonwebtoken");
router.get('/',auth, async (req,res)=>{
    userId=req.user.id;
try{
    
    const user = await User.findOne({
        where:{
            id:userId
        },
        attributes:{
            exclude:['password']
        }});
    res.json(user);
}
catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
}
});
router.post("/", async(req,res) =>{
    const {email, password} = req.body
    console.log(req.body);
    try{
        const foundUser=await User.findOne({where:{email}});
        if (!foundUser){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]})
        }
        
        const passMatch=await bcrypt.compare(password,foundUser.password);
        if (!passMatch)
        {
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]})
        }
        const payload={
            user:{
                id:foundUser.id,
                tip:foundUser.tip 
            }
        }
        return jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token)=>{
                if (err)throw err;
                res.json({token});}
        );
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }})
module.exports=router;