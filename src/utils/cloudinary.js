const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({ 
  cloud_name: 'dfaxzahb0', 
  api_key: '477279579552534', 
  api_secret: '8H7ZfZznu35WQ3bMH46QEXgWvLg' 
});

const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "Products",
  });
};

const deleteImage = async (publicId) => {
  return await cloudinary.v2.uploader.destroy(publicId);
};

module.exports = { uploadImage, deleteImage };
