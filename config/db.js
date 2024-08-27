import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = mongoose.connect(process.env.mongo_db_Url)

connection.then(()=>{
console.log("connected with database successfully");
}).catch((err)=>{
    console.log("unable to connect with database",err)
})

export default connection;