import  {asynchandler} from "../Utils/asynchandler.js"
import { apierror } from "../Utils/apierror.js";
import { User } from "../models/user.js";
import { apiresponce } from "../Utils/apiresponce.js";

const refreshaccess=(async(userId)=>{
    try {
const user=await User.findById(userId)
        const access=user.generatetokenAccessToken()
const refresh=user.generateRefreshToken()
user.refreshToken=refresh;
await user.save({validateBeforeSave:false})
return{access,refresh}
    } catch (error) {
        throw new apierror(500,"problem while generate accesstoken and refreshtoken")
    }


})

const login=asynchandler(async(req,res)=>{
const {username,password,email}=req.body;
if(!(username||password)){
throw new apierror(400,"fill password or username")
}

const userfounded= await User.findOne({
    $or:[{username},{email}]
})

if(!userfounded){
    throw apierror(400,"singn up first")
}
const a=await userfounded.isPasswordCorrect(password)
if(!a){
    throw new apierror(401,"password is not correct")
}
const id=userfounded._id
console.log(id);
const {access,refresh}= await refreshaccess(id)

//now send it to cookies

const login=await User.findById(id).select("-password -refreshToken")

//it is for secqurity by this server can able to modifie cookie only not able to modefie by front end
const option={
    httpOnly:true,
    secure:true
}


return res.status(200)
.cookie("accessToken",access,option)
.cookie("refreshToken",refresh,option)
.json(
    new apiresponce(200,{
        userfounded:login,refresh,access
    },"userlogin")
)
})




// logout

export {login}