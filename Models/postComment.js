const sequelize = require("../Config/dbConnect");
const {DataTypes} = require("sequelize");

const postComment = sequelize.define('postComment', {
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    postId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profileImg:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    tableName: 'postcomments'
})

module.exports = postComment;