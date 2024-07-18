const UserPost = require("../Models/postSchema");
const cloudnary = require("cloudinary").v2;
const User = require("../Models/loginSchema");
const PostLikes = require("../Models/postLikes");
const { where, Sequelize } = require("sequelize");
const PostComment = require("../Models/postComment");

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
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(postcomments.postId)
              FROM postcomments
              WHERE postcomments.postId = UserPost.id
            )`),
            'commentCount'
          ]
        ]
      },
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

exports.postLikes = async (req, res)=>{
  try{
    const {postId, userId, userName} = req.body;
    
    await PostLikes.create({postId, userId, userName})

    return res.status(200).json({
      success:true,
      message:"Like successfully"
    })
    
  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

exports.getLikesCount = async (req, res) => {
  try {
    const { postId , userId } = req.params;

    const result = await PostLikes.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('userId')), 'likeCount']],
      where: {
        postId: postId
      }
    });

    const likeCount = result[0].dataValues.likeCount;

    const likedResult = await PostLikes.findAll({
      where: {
        postId: postId,
        userId: userId
      }
    });

    return res.status(200).json({
      success: true,
      result: likeCount,
      likedResult,
      message: "like successfully"
    });

  } catch (error) {
    console.error('Error fetching like count:', error.name);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.deletePostLike = async (req, res) => {
  try {
    const { postId , userId } = req.params;

    if(!postId || !userId){
      return res.status(500).json({
        success:false,
        message:"all fields are required"
      })
    }

    const result = await PostLikes.destroy({
      where: {
        postId: postId,
        userId: userId
      }
    });

    return res.status(200).json({
      success: true,
      result,
      message: "unlike successfully"
    });

  } catch (error) {
    console.error('Error fetching like count:', error.name);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addComment = async (req, res) =>{
  try{
    const { postId , userId, comment, profileImg , userName } = req.body;

    if(!postId || !userId || !comment || !userName){
      return res.status(500).json({
        success:false,
        message:"all fields are required"
      })
    }

    const result = await PostComment.create({
      postId,
      userId,
      comment,
      profileImg,
      userName,
    })

    return res.status(200).json({
      success: true,
      result,
      message: "comment successfully"
    });

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
exports.getComment = async (req, res) =>{
  try{
    const { postId} = req.params;

    const result = await PostComment.findAll({
      where:{postId}
    })

    return res.status(200).json({
      success: true,
      result,
      message: "comment get successfully"
    });

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
exports.deletePost = async (req, res) =>{
  try{
    const { postId} = req.params;
    
    const result = await UserPost.destroy({
      where:{id:postId}
    })

    return res.status(200).json({
      success: true,
      result,
      message: "Post deleted successfully"
    });

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}