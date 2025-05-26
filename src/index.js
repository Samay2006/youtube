
import { database } from "./db/database.js";
import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config({
    path:"./env"
})


database()
.then(()=>{
app.listen(process.env.port,()=>{
    console.log(`server is running on ${process.env.port}`)
});

})
.catch((error)=>{
console.log(error)
})