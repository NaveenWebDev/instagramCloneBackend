const FollowSchema = require("../Models/follow");
const UserPost = require("../Models/postSchema");
const User = require("../Models/loginSchema")
const UserComment = require("../Models/postComment")

exports.addFollow = async (req, res)=>{
    try{
        const {userId, followingId} = req.params;

        if(!userId || !followingId){
            return res.status(500).json({
                success:false,
                message:"all fields are required"
            });
        };

        await FollowSchema.create({
            userId,
            followerId:followingId
        })

        return res.status(200).json({
            success:true,
            message:"Follow successfully"
        })


    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
exports.deleteFollow = async (req, res)=>{
    try{
        const {userId, followingId} = req.params;

        if(!userId || !followingId){
            return res.status(500).json({
                success:false,
                message:"all fields are required"
            });
        };

        await FollowSchema.destroy({
            where:{
                userId,
                followerId:followingId
            }
        })

        return res.status(200).json({
            success:true,
            message:"Follow successfully"
        })


    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
exports.updateUserProfileData = async (req, res)=>{
    try{

        var {userId, userName, fullName, bio} = req.body;
        console.log(userId)
        await User.update({userName,fullName,bio},{
            where:{
                id:userId
            }
        })
        await UserComment.update({userName},{
            where:{
                userId
            }
        })
        await UserPost.update({userName},{
            where:{
                userId
            }
        })
        return res.status(200).json({
            success:true,
            result:'Data Updated Successful'
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
