const { where, Sequelize } = require("sequelize");
const FollowSchema = require("../Models/follow");
const UserPost = require("../Models/postSchema");

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