import express from "express";
import NotesModel from "../models/notes.model.js";

const noteRouter = express.Router();

noteRouter.post("/create", async(req,res)=>{
    const{title, description, status } = req.body;
    const userId = req.user._id;
    console.log(req.body);
    console.log(userId)
    try{
        const note = new NotesModel({
            title, 
            description, 
            status,
            userId
        });
        await note.save();
        res.status(200).send({message: "Notes created successfully.."});
    }
    catch(error){
        res.status(500).send({message: `Error while creating the notes ${error}`});
    }
})

noteRouter.get("/", async(req,res)=>{
    const userId = req.user._id;
    console.log(userId.toString());
try{
const notes = await NotesModel.find({userId});
res.status(200).json({notes});
}
catch(error){
    res.status(500).send({message: `Error while getting the notes ${error}`});
}
})

noteRouter.patch("/update/:id", async(req,res)=>{
const payload = req.body
const noteId = req.params.id
const userId = req.user._id

console.log(payload, userId, noteId);
try{
    const note = await NotesModel.findOne({_id:noteId})
    console.log("notes", note);
    if(note.userId.toString() === userId.toString()){
        console.log("hi");
        await NotesModel.findByIdAndUpdate({_id:noteId}, payload)
       return res.status(200).send({message: "Notes updated successfully.."});
    }
    else{
      return res.status(401).json({message:"unothorised"})
    }
}
catch(error){
    res.status(500).send({message: `Error while updating the note ${error}`});
}
})
noteRouter.delete("/delete/:id", async(req,res)=>{
 const noteId = req.params.id
 const userId = req.user._id
 console.log(noteId, userId)

 try{
    const note = await NotesModel.findOne({_id:noteId})
    if(note.userId.toString() === userId.toString()){
        await NotesModel.findByIdAndDelete({_id:noteId})
       return res.status(200).json({message:"Note deleted successfully.."});
    }
    else{
        return res.status(401).json({message:"unothorised"})
      }
 }
 catch(error){
    res.status(500).send({message: `Error while deleting the note ${error}`});
 }
})

export default noteRouter;