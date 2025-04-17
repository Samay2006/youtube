import mongoose from "mongoose";
import { DB_NAME } from "../Utils/constrants.js";

const database=async()=>{
    try {
       const a= mongoose.connect(`${process.env.URL}/${DB_NAME}`)
       console.log("connected")
// console.log(a.connection.host)
    } catch (error) {
        console.log("mongodb connection fail",error)
        // throw error;
    }
}

export {database}