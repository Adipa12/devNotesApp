import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connection from "./config/db.js";
import userRouter from "./routes/user.route.js";
import noteRouter from "./routes/note.route.js";
import auth from "./middleware/auth.middleware.js";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 4000

server.use(cors({
    origin: '*'
}))

server.use(express.json())
server.use("/user",userRouter)
server.use("/note", auth, noteRouter)

server.get("/",(req,res)=>{
    res.status(200).json({message:"welcome to live server.."})
});

server.listen(PORT, async() =>{
    try{
        await connection
        console.log(`connect with port nom: ${PORT} and database successfully`);
    }catch(error){
        console.log(`unable to connect with: ${PORT}`,error);
    }
})
