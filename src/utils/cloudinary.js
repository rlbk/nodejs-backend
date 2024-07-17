import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import envConfig from "../config/envConfig.js";

cloudinary.config({
  cloud_name: envConfig.cloudinaryCloudName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryApiSecret,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary.", uploadResponse.url);
    return uploadResponse;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
