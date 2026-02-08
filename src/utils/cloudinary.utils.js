import {v2 as cloudinary} from "cloudinary"
import fs from "fs"





// Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME, 
        api_key:process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });


const uploadCloudinar=async (localfilePath)=>{
    try{
        if(!localfilePath)return null
        const response =await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })
        console.log("File is uploaded",response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localfilePath)
        return null

    }
}

export {uploadCloudinar}

