const { Sequelize } = require("sequelize");
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mssql",
  dialectOptions:{
    options:{
      encrypt:true,
    }
  }
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySql Conección correcta");
  } catch (error) {
    console.log("MySql Error Conección ", error);
  }
};

module.exports = { sequelize, dbConnectMySql };
