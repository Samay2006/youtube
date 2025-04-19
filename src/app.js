import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
const app=express();
//by this we give the permission to frontend to access our backend

app.use(cors(
    {
        origin:process.env.CORE_ORIGIN
    }
))

app.use(express.json({limit:"16kb"}))//accapting data threw form(written data)
app.use(express.urlencoded({limit:"16kb"}))//accapting data threw url

app.use(express.static("public"))//it store use info like pdf and img in our localspace in public folder 

app.use(cookieParser())//it help  us to access the user cookie in our local device(server) and perform the operation on it
export {app}