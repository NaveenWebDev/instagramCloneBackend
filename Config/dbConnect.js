const Sequelize = require("sequelize");
require("dotenv").config()

const dbName = process.env.DB_NAME;
const hostName = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;

const sequelize = new Sequelize(dbName, dbUser,  dbPassword, {
  host: hostName,
  dialect:'mysql',
  port: process.env.DB_PORT || 8000
});

(async function runSquelize() {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connection Has Been Established Successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;