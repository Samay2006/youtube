import  {asynchandler} from "../Utils/asynchandler.js"
import { apierror } from "../Utils/apierror.js";
import { User } from "../models/user.js";
import { apiresponce } from "../Utils/apiresponce.js";
import { verifyjwt } from "../middlewares/auth.js";

const logout=asynchandler(async( req,res)=>{

await  User.findByIdAndUpdate(
    req.user._id,{
        $set:{refreshToken:undefined}
    },
    {
        new:true
    })

    const option={
    httpOnly:true,
    secure:true
}

return res 
.status(200)
.clearCookie("accessToken",option)
.clearCookie("refreshToken",option)
.json(new apiresponce(200,{},"user logout"))
})

export {logout}