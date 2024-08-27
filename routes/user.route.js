import express from "express";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
    const{name,email,password,gender,age} = req.body;
    try{
        bcrypt.hash(password,4, async function(err, hash){
            console.log(hash);
            if(err){
               return res.status(500).json({message:"unable to hash the password",err})
            }            
                const user = new UserModel({
                    name,
                    email,
                    password : hash,
                    gender,
                    age
                });
                await user.save();
                res.status(200).json({message:"user register successfully.."})          
        });
        
    }catch(error){
        res.status(500).json({message:`user not register ${error}`})
    }
});

userRouter.post("/login", async(req,res)=>{
const{email,password} = req.body;
try{
    const user = await UserModel.findOne({email});
    if(!user){
       return res.status(400).json({message:"user not found in database"});
    }
    if(user){
        bcrypt.compare( password, user.password, function(err, result){
            if(err){
                return res.status(500).json({message:"Internal server error"});
            }
            if(result){
                const token = jwt.sign({id:user._id}, process.env.jwt_secret_key)
                res.status(200).json({
                    message:"User Login successfully",
                    token
                });
            }
            else{
                res.status(500).json({message:"invalid password"});
            }
        });
    }
}
catch(error){
    res.status(500).json({message:`user not login ${error}`})
}
});
export default userRouter;