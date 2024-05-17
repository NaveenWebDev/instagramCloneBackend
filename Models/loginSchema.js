const {DataTypes } = require('sequelize');
const sequelize = require("../Config/dbConnect");

const User = sequelize.define('userLogin', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull:true
  },
});

module.exports = User;