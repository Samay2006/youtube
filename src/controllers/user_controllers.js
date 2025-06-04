import  {asynchandler} from "../Utils/asynchandler.js"
import { apierror } from "../Utils/apierror.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { apiresponce } from "../Utils/apiresponce.js";
import jwt from "jsonwebtoken"
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








// access and refresh token reseat code 

const refreshaccesstoken= asynchandler(async(req,res,next)=>{

// const acctoken=req.cookies.accessToken;
const retoken=req.cookies.refreshToken||req.boby.refreshToken;
if(!retoken){
    throw  new apierror(500,"refreshToken not founded")
}
verifiedtoken=jwt.verify(retoken,process.env.REFRESH_TOKEN_SECRET)
if(!verifiedtoken){
    throw new apierror(500,"token is not valid")
}

const user=await  User.findById(verifiedtoken._id)

if(!user){
    throw new apierror(500," from update token user not founded")
}
if(retoken!==user.refreshToken){
        throw new apierror(500,"token is not valid")

}

const access=user.generatetokenAccessToken();
const refresh=user.generateRefreshToken();
user.refreshToken=refresh
await user.save({validateBeforeSave:false})
 
const option={
    httpOnly:true,
    secure:true
}

res.status(200)
.cookie("accessToken",access,option)
.cookie("refreshToken",refresh,option)
.json(new apiresponce(200,{
    access,refresh
},("refresh successfully")))
})





// password reset code
const password=asynchandler(async(req,res,next)=>{
    const {newpassword,oldpassword}=req.body

const user=await User.findById(req.user._id)
const check=await user.isPasswordCorrect(oldpassword)

if(!check){
    new apierror(400,"old password is wrong")
}

user.password=newpassword
await user.save({validateBeforeSave:false})
res.status(200)
.json(new apiresponce(200,{},"password is change successfully"))
})



// for find current user

const currentuser=asynchandler((req,res)=>{
res.status(200)
.json(200,req.user,"current user")
})


//edit detail of user

const detail=asynchandler(async(req,res,next)=>{
const {nemail,nfullname}=req.body
if(!(nemail||nfullname)){
    throw new apierror(400,"bro fill atleat one of them")
}
const user =await User.findByIdAndUpdate(req.body._id,{
    $set:{
      email:nemail,
      fullname:nfullname

    }
},{new:true})
.select(-password)


return res.status(200)
.json(new apiresponce(200,user,"user detail update successfully"))
})




const useravatar=asynchandler(async(req,res,next)=>{
const {avatar}=req.body
const path=req.files.path

if(!path){
    throw new apierror(400,"upload new avatar")
}

const cloud=await uploadOnCloudinary(path)
if(!cloud.url){
    throw new apierror(500,"not upload on cloudinary")
}
// req.user.avatar=cloud.url
// await user.save({ validateBeforeSave: false });


const user=await User.findByIdAndUpdate(req.user._id,{
    $set:{
        avatar:cloud.url
    }
},{new:true})
.select(-password)

return res.status(200)
.json(new apiresponce(200,user,"user avatar update successfully"))

})
export {register,refreshaccesstoken,currentuser,password,useravatar}