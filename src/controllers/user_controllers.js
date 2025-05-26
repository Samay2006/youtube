import  asynchandler from "./Utils/asynchandler.js"



const register=asynchandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})