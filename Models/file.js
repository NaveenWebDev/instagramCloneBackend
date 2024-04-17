const {DataTypes} = require("sequelize");
const sequelize = require("../Config/dbConnect");

const fileSchema = sequelize.define('profileImg', {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require:true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    // timestamps: false
  });

module.exports = fileSchema;