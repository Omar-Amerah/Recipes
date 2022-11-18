const { Sequelize, DataTypes, Model } = require("sequelize")
const db = require("../db/db.js")



class Recipe extends Model{}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carbohydrates: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sodium: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sugar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {sequelize: db})

module.exports = Recipe
