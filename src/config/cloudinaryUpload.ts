import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const uploadImage = async (filePath: string) => {
  try {
    const resUpload = await cloudinary.uploader.upload(filePath, {
      folder: "profile_picture",
    });

    console.log("UPLOADER RESULT:", resUpload);

    fs.unlinkSync(filePath);

    return resUpload.secure_url;
  } catch (error) {
    console.log("upload failed", error);
  }
};
