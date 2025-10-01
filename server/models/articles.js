const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // instance Sequelize

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: "Non catégorisé",
  },
  tags: {
    type: DataTypes.JSON, // stocker un tableau de tags en JSON
    defaultValue: []
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = Article;