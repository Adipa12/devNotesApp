import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    gender:{
        type: String,
        enum:["male","female"],
        required : true
    },
    age:{
        type: String,
        required: true
    }
},{
    versionKey:false,
    timestamps: true
});
const UserModel = mongoose.model("user",userSchema);

// export {UserModel };
export default UserModel;