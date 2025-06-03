import mongoose, { Mongoose, Schema } from "mongoose";


const sub=new Schema({
subscriber:{
type:Schema.Types.ObjectId,
ref:"User"

},
channel:{
type:Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true})


export const Subsciption=mongoose.model("Subsciption",sub)
