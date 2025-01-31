const { Sequelize, Model, DataTypes } = require("sequelize");
const { User, Token } = require("../models/users");
const {Producto} = require("../models/productos");



const crearInstanceSequelize = () => {
  // Create Sequelize instance
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/database.sqlite",
  });
  User.init(sequelize);
  Token.init(sequelize);
  Producto.init(sequelize);


  
  // Sync models with database
  sequelize.sync();

  return sequelize;
};

module.exports = { User, Token, crearInstanceSequelize };
