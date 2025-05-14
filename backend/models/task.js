"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Task.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            status: {
                type: Sequelize.ENUM("concluído", "pendente", "em andamento"),
                allowNull: false,
                defaultValue: "pendente",
            },
        },
        {
            sequelize,
            modelName: "Task",
        }
    );
    return Task;
};
