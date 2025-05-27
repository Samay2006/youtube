import { Router } from "express";
import { register } from "../controllers/user_controllers.js";

const router=Router();

//http://localhost:8000/api/v1/user/register
router.route("/register").post(register)
//http://localhost:8000/api/v1/user/login
// router.route("/login").post(login)
export default router