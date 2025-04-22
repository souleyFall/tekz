const express = require('express');
const cors = require('cors');
const path = require('path');
const articlesRoutes = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/articles', articlesRoutes);

// Servir les fichiers statiques en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});