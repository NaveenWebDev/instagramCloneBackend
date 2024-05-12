const { Op } = require("sequelize");
const chats = require("../Models/chats");

const chat = async (req, res) =>{
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
}

const createChat = async (req, res) =>{
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
}

module.exports = {
    chat ,
    createChat
}
