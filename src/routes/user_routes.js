import { Router } from "express";
import { register } from "../controllers/user_controllers.js";
import { upload } from "../middlewares/multer.js";
import { login } from "../controllers/login_controller.js";
import { verifyjwt } from "../middlewares/auth.js";
import { logout } from "../controllers/logout.js";
import { refreshaccesstoken } from "../controllers/user_controllers.js";
const router=Router();

//http://localhost:8000/api/v1/user/register
router.route("/register").post(
    upload.fields([
    {
name:"avatar" ,
maxCount:1
    },
    
]),register)
//http://localhost:8000/api/v1/user/login
router.route("/login").post(login)


router.route("/logout").post(verifyjwt,logout)
router.route("/refreshtoken").post(refreshaccesstoken)


export default router