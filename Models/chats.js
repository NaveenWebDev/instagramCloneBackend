const sequelize = require("../Config/dbConnect");
const {DataTypes} = require("sequelize");

const chats = sequelize.define('chats', {
    userId :{
        type:DataTypes.INTEGER,
        allowNull:false,
        require:true
    },
    chat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    receiverId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        require:true
    } 
});

module.exports = chats