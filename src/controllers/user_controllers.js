import  {asynchandler} from "../Utils/asynchandler.js"
import { apierror } from "../Utils/apierror.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { apiresponce } from "../Utils/apiresponce.js";
const register=asynchandler(async(req,res)=>{


    const {username,fullname,password,email,avatar}=req.body;
    if([username,fullname,password,email,avatar].some((a)=>!a===""))
        throw new apierror(400,"filled all field")
    
const registeruser= await User.findOne({
    $or:[{username},{email}]
})
if(registeruser){
    throw new apierror(409,"user is already exist")
}


const avatarlocalpath=req.files?.avatar[0]?.path;
console.log(avatarlocalpath)
if(!avatarlocalpath){
    throw new apierror(400,"avatar is requred")
}

const avataroncloud=await uploadOnCloudinary(avatarlocalpath)

if(!avataroncloud){
    throw new apierror(400,"not able to upload in cloud")
}

// now we make obj of user detail
const user= await User.create({
    username:username.toLowerCase(),
    fullname,
    avatar:avataroncloud.url,
    password,
    email
    
})
// 
const  userfind= await User.findById(user._id).select(
"-password -refreshToken")
if(!user){
    throw new apierror(500,"somthing is wrong")
}
console.log(userfind)
 res.status(201).json(
        new apiresponce(200,userfind,"done")
     )



})
export {register}