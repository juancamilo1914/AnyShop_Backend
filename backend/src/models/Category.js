const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Category = sequelize.define(
  "category", 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: { len: [3, 25], notEmpty: true },
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { len: [3, 50], notEmpty: true },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
  },
  { timestamps: true } 
);

module.exports = Category;
