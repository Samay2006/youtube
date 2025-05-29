import { Router } from "express";
import { register } from "../controllers/user_controllers.js";
import { upload } from "../middlewares/multer.js";
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
// router.route("/login").post(login)
export default router