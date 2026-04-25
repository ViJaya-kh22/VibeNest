const  cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({storage : multer.memoryStorage()});

const uploadtoCloudinary = (buffer,options) => {
   return new Promise((resolve,reject)=>{
     cloudinary.uploader.upload_stream(options , (error,result)=>{
        if(error) reject(error);
        else resolve(result);
     }).end(buffer);
   });
};



module.exports = {upload , uploadtoCloudinary};