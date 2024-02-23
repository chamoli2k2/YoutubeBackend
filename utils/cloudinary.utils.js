import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            console.log("File path not found!!");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        // Printing successful message
        console.log("file is uploaded on cloudinary", response.url);

        return response;
    }
    catch(error){
        // Remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)
    }
}

export { uploadOnCloudinary };