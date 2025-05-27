import  {asynchandler} from "../Utils/asynchandler.js"



const register=asynchandler(async(req,res)=>{
   
    const {fullname}=req.body
console.log(fullname);

})

export {register}

