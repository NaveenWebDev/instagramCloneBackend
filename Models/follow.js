const sequelize = require("../Config/dbConnect");
const {DataTypes} = require("sequelize");

const follow = sequelize.define('follow', {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require:true
    },
    followerId: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
  });

module.exports = follow;