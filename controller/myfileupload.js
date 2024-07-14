const filemodel = require("../Models/file");
const cloudnary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const User = require("../Models/loginSchema");
const UserPost = require("../Models/postSchema");
require("dotenv").config();
//localfileupload = handler function

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudnary.uploader.upload(file.tempFilePath, options);
}

// image upload on cloudnary
exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { userId, email } = req.body;
    console.log(userId, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //is file formate suppported

    const respone = await uploadFileToCloudinary(file, "naveenCode");
    console.log(respone);
    //save entry on database
    const updatedData = {
      imageUrl: respone.secure_url,
    }
    const updatedDataprofileImg = {
      profileImg: respone.secure_url,
    }


    const fileData = await User.update(updatedData, {
      where:{
        id:userId
      }
    });
    const fileDataPost = await UserPost.update(updatedDataprofileImg, {
      where:{
        userId
      }
    });

    res.json({
      success: true,
      message: "image successfuly uploaded",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getProfileData = async (req, res)=>{
  try{
    const {id} = req.params;
    const usersProfile = await User.findOne({
      where:{
        id
      },
      attributes:["id", "imageUrl"]
    })
    // console.log(usersProfile)
    res.status(200).json({
      result:usersProfile,
      message: "data get successfuly",
    });
  }catch(err){
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
}; 