const { Model, DataTypes } = require("sequelize");

// Define User model
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: {
              msg: "El campo name es requerido",
            },
            notEmpty: {
              msg: "El campo name no puede estar vacío",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "El campo email debe ser un email válido",
            },
            notNull: {
              msg: "El campo email es requerido",
            },
            notEmpty: {
              msg: "El campo email no puede estar vacío",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "password",
          validate: {
            notNull: {
              msg: "El campo password es requerido",
            },
            notEmpty: {
              msg: "El campo password no puede estar vacío",
            },
          },
        },
      },
      { sequelize, modelName: "user" }
    );
  }
}


class Token extends Model {
  static init(sequelize) {
    super.init(
      {
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, modelName: "token" }
    );
  }
}

module.exports = { User, Token };