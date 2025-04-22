const express = require('express');
const router = express.Router();
const articlesModel = require('../data/articles');

// Récupérer tous les articles
router.get('/', (req, res) => {
  res.json(articlesModel.getAll());
});

// Récupérer un article par son slug
router.get('/slug/:slug', (req, res) => {
  const article = articlesModel.getBySlug(req.params.slug);
  if (!article) {
    return res.status(404).json({ message: "Article non trouvé" });
  }
  res.json(article);
});

// Récupérer un article par son ID
router.get('/:id', (req, res) => {
  const article = articlesModel.getById(req.params.id);
  if (!article) {
    return res.status(404).json({ message: "Article non trouvé" });
  }
  res.json(article);
});

// Créer un nouvel article
router.post('/', (req, res) => {
  // Validation des données
  const { title, author, excerpt, content, category, tags } = req.body;
  if (!title || !author || !content) {
    return res.status(400).json({ message: "Le titre, l'auteur et le contenu sont obligatoires" });
  }
  
  const newArticle = articlesModel.create({
    title,
    author,
    excerpt: excerpt || "",
    content,
    category: category || "Non catégorisé",
    tags: tags || []
  });
  
  res.status(201).json(newArticle);
});

// Mettre à jour un article
router.put('/:id', (req, res) => {
  const updatedArticle = articlesModel.update(req.params.id, req.body);
  if (!updatedArticle) {
    return res.status(404).json({ message: "Article non trouvé" });
  }
  res.json(updatedArticle);
});

// Supprimer un article
router.delete('/:id', (req, res) => {
  const deleted = articlesModel.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Article non trouvé" });
  }
  res.status(204).send();
});

module.exports = router;
