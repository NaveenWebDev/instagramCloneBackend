const { DataTypes } = require('sequelize');
const sequelize = require("../Config/dbConnect");

const UserPost = sequelize.define('UserPost', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  tableName:'userposts'
});

module.exports = UserPost;
