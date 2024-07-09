const { Op, where,} = require("sequelize");
const chats = require("../Models/chats");
const User = require("../Models/loginSchema");
const sequelize = require("../Config/dbConnect");
const profileimgs = require("../Models/file")

const chat = async (req, res) =>{
    try{
    const {userId, receiverId} = req.params;

    console.log(userId)
    console.log(receiverId)
    if(!receiverId || !userId){
        return res.status(500).json({
            success:false,
            message:"all fields are required"
        })
    }


    const mychats = await chats.findAll({
        where: {
            [Op.or]: [
                { userId: userId, receiverId: receiverId },
                { userId: receiverId, receiverId: userId }
            ]
        }
    })
    return res.status(200).json({
        success:true,
        message:"Data fetched successfully",
        result:mychats
    })
    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message,
        })

    }

}

const createChat = async (req, res) =>{
    try{

    const {userId, chat, receiverId} = req.body;

    if(!userId || !chat || !receiverId){
        return res.status(500).json({
            success:false,
            message:"all fields are required"
        })
    }

    await chats.create({
        userId,
        chat,
        receiverId
    })

    return res.status(200).json({
        success:true,
        message:"Chats saved success",
    })

    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message,
        })
    }

}

const getUserDataForChat = async (req, res)=>{
    try{
        const userDta = await User.findAll({
            attributes:["id","userName","imageUrl"]
        });


        return res.status(200).json({
            success:true,
            message:"data fetched successfully",
            result:{
                userDta,
            }
        })

    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message,
        })
    }
}
const getUserDataForChatById = async (req, res)=>{
    const {id} = req.params;
    try{
        const result = await User.findAll({
            where:{
                id
            },
            attributes:["id","userName","imageUrl"]
        });


        return res.status(200).json({
            success:true,
            message:"data fetched successfully",
            result
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

module.exports = {
    chat ,
    createChat,
    getUserDataForChat,
    getUserDataForChatById
}
