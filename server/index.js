const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize');
const articlesRoutes = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/articles', articlesRoutes);

sequelize.sync().then(() => {
  console.log("Base de données synchronisée !");
  app.listen(PORT, () => console.log('Server started on port 3000'));
});