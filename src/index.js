import express from "express" 
import 'dotenv/config'



const app=express()

app.get('/',(req,res)=>{
res.send("hello");
})
app.get('/hello',(req,res)=>{
    res.send("hello samay");
    })

app.listen(process.env.port,(req,res)=>{
    console.log(`run at ${process.env.port}`)
});
