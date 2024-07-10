const UserPost = require("../Models/postSchema");
const cloudnary = require("cloudinary").v2;
const User = require("../Models/loginSchema");
const { where } = require("sequelize");

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

exports.posts = async (req, res) => {
  try {
    const { userId, userName, description, profileImg } = req.body;
    console.log(userId , userName, description)
    const file = req.files.imageFile;
    console.log(file);

    // if (!userId || !description || !file) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "all fields are required",
    //     });
    //   }

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

    const postData =await UserPost.create({
      userId,
      description,
      imageUrl: respone.secure_url,
      userName,
      profileImg
    });

    return res.status(201).json({
      message: "Post uploaded successfully",
      postData,
    });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: "Error while upload",
      error: err.message,
    });
  }
};

exports.getPost = async (req, res) =>{
  try{

    const allPostData = await UserPost.findAll({
      order: [['createdAt', 'DESC']]
    })

    if(allPostData){
      return res.status(200).json({
        success:true,
        message:"get fetch successfully",
        result:allPostData,
      })
    }

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success:false,
      message:err.message,
  })
  }
};

exports.getPostsByPostId = async (req, res) =>{
  try{
    const {userId} = req.params;

    const allPostData = await UserPost.findAll({
      where:{userId},
      attributes:["userId", "imageUrl"]
    })

    if(allPostData){
      return res.status(200).json({
        success:true,
        message:"get fetch successfully",
        result:allPostData,
      })
    }

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success:false,
      message:err.message,
  })
  }
};