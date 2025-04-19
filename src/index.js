// import express from "express" 
// import 'dotenv/config'



// const app=express()

// app.get('/',(req,res)=>{
// res.send("hello");
// })
// app.get('/hello',(req,res)=>{
//     res.send("hello samay");
//     })

// app.listen(process.env.port,(req,res)=>{
//     console.log(`run at ${process.env.port}`)
// //
//  import mongoose from "mongoose";
//  import "dotenv/config";
//  function samay(){
 
// mongoose.connect(`${process.env.URL}/samay`)
// .then(()=>{
//     console.log("connected");
// })
// .catch((errror)=>{
// throw errror;
// })
//  }

//  samay();
// mongoose.connect(`${process.env.URL}`)
//     .then(() => {
//         console.log("conectad");
//     })
//     .catch((a) => {
//         console.log("error");
//     });
// filepath: c:\Users\samay\OneDrive\Desktop\project backend2\src\index.js
import { database } from "./db/database.js";
import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config({
    path:"./env"
})


database()
.then(()=>{
app.listen(process.env.port,()=>{
    console.log(`server is running on ${process.env.port}`)
});

})
.catch((error)=>{
console.log(error)
})