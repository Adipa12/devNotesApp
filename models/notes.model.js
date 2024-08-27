import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    status:{
        type: Boolean,
        required : true
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"user", 
        required: true
    }
},{
    versionKey:false,
    timestamps: true
});
const NotesModel = mongoose.model("notes",notesSchema);


// export {NotesModel} ;
export default NotesModel;