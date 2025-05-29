import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.my_cloud_name, 
  api_key: process.env.my_key, 
  api_secret: process.env.my_secret
});


const uploadOnCloudinary=async (localfile)=>{
    try {
        if(!localfile) return null
      const result=  await cloudinary.uploader.upload(localfile,{
            resource_type:"auto"
        })
        console.log("file uploaded on cloudinary")
        return result
    } catch (error) {
        
        fs.unlinkSync(localfile)//it remove the file from local server if it is  fail to upload in cloudinary
        return null
    }

}
// console.log(uploadOnCloudinary)

export {uploadOnCloudinary}