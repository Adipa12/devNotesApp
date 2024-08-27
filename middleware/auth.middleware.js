import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const auth = async (req,res, next)=>{ 
  if(!req.headers.authorization){
    return res.status(401).json({message:"token not found "}); 
  }
    const token = req.headers.authorization.split(" ")[1]    
        if(!token){
           return res.status(401).json({message:"token not found please login first"}); 
        }
      try{
        const decoded = jwt.verify(token, process.env.jwt_secret_key);
        if(!decoded){
         return res.status(401).json({message:"Invalid token please login again.."});
        }
        const user = await UserModel.findById(decoded.id);
        req.user = user;
        next(); 
      }
      catch(error){
        res.status(500).json({message:"unable to authenticate"})
      }
}
export default auth;