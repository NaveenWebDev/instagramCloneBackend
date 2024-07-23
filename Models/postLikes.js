const sequelize = require("../Config/dbConnect");
const {DataTypes} = require("sequelize");

const postLikes = sequelize.define('postLikes', {
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    postId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName: "postlikes"
});

module.exports = postLikes;