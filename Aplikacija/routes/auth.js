const express =require("express");
const router= express.Router();
const auth=require("../middleware/auth");
const User=require('../models').User;
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
module.exports=router;