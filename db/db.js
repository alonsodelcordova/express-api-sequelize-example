const { Sequelize, Model, DataTypes } = require("sequelize");
const { User, Token } = require("../models/users");
const { Producto } = require("../models/productos");

DB_NAME = process.env.DB_NAME || "db";
DB_USER = process.env.DB_USERNAME || "root";
DB_PASS = process.env.DB_PASSWORD || "";
DB_HOST = process.env.DB_HOST || "localhost";

const crearInstanceSequelize = () => {
  // Create Sequelize instance
  const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
      dialect: "mysql",
      host: DB_HOST,
    }
  );

  //conection
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  // Initialize models
  User.init(sequelize);
  Token.init(sequelize);
  Producto.init(sequelize);

  // Sync models with database
  sequelize.sync();

  return sequelize;
};

module.exports = { User, Token, crearInstanceSequelize };
