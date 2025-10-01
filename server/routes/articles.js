const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Récupérer tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// Récupérer un article par son slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ where: { slug: req.params.slug } });
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// Récupérer un article par son ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// Créer un nouvel article
router.post('/', async (req, res) => {
  try {
    const { title, author, excerpt, content, category, tags, slug } = req.body;
    if (!title || !author || !content) {
      return res.status(400).json({ message: "Le titre, l'auteur et le contenu sont obligatoires" });
    }

    const newArticle = await Article.create({
      title,
      author,
      excerpt: excerpt || "",
      content,
      category: category || "Non catégorisé",
      tags: tags || [],
      slug: slug || title.toLowerCase().replace(/\s+/g, "-") // petit slug auto
    });

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// Mettre à jour un article
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    await article.update(req.body);
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// Supprimer un article
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Article.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

module.exports = router;