const { Model, DataTypes } = require("sequelize");

// Define User model
class Producto extends Model{

    static init(sequelize){
        super.init(
            {
                nombre: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: "El campo nombre es requerido",
                        },
                        notEmpty: {
                            msg: "El campo nombre no puede estar vacío",
                        },
                    },
                },
                precio: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: "El campo precio es requerido",
                        },
                        notEmpty: {
                            msg: "El campo precio no puede estar vacío",
                        },
                    },
                },
                stock: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                descripcion: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                imagen: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            { sequelize, modelName: "productos" }
        );
    }

}

module.exports = { Producto };