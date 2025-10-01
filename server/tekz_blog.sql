
-- 1️⃣ Créer la base de données
CREATE DATABASE IF NOT EXISTS tekz_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tekz_blog;

-- 2️⃣ Créer la table articles
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    category VARCHAR(255) DEFAULT 'Non catégorisé',
    tags JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3️⃣ Insérer les articles
INSERT INTO articles (id, title, slug, author, date, excerpt, content, category, tags) VALUES
(1, 'Les fondamentaux de React.js', 'fondamentaux-react-js', 'Jean Dupont', '2025-04-10', 'Découvrez les concepts de base de React et comment créer vos premières applications.', 
'# Les fondamentaux de React.js

React est une bibliothèque JavaScript populaire pour la création d'interfaces utilisateur, particulièrement pour les applications à page unique (SPA).

## Pourquoi React?

- **Composants réutilisables**: Créez des éléments d'interface modulaires
- **DOM virtuel**: Optimisation des performances
- **Écosystème riche**: De nombreuses bibliothèques complémentaires

## Comment démarrer

Pour commencer avec React, vous devez d'abord installer Node.js, puis créer une nouvelle application avec Create React App:

```bash
npx create-react-app mon-application
cd mon-application
npm start
```

## Les Hooks

Les Hooks sont une fonctionnalité introduite dans React 16.8 qui permet d'utiliser l'état et d'autres fonctionnalités de React sans écrire de classe.
', 'Développement Web', '["React","JavaScript","Frontend"]'),

(2, 'Node.js et Express: Créer une API RESTful', 'nodejs-express-api-restful', 'Marie Laurent', '2025-04-15', 'Apprenez à construire une API robuste avec Node.js et Express.', 
'# Node.js et Express: Créer une API RESTful

Express est un framework minimaliste pour Node.js qui facilite la création d'applications web et d'APIs.

## Configuration de base

Commencez par initialiser votre projet et installer Express:

```bash
mkdir mon-api
cd mon-api
npm init -y
npm install express
```

## Structure de l'API

Une bonne pratique est d'organiser votre API avec des routes, des contrôleurs et des modèles:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/items', (req, res) => {
  // Logique pour récupérer des éléments
  res.json({ items: [] });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
```

## Middleware

Les middleware sont des fonctions qui ont accès à l'objet de requête, à l'objet de réponse et à la fonction next() dans le cycle de requête-réponse.
', 'Backend', '["Node.js","Express","API","JavaScript"]'),

(3, 'Les meilleures pratiques en développement full-stack JavaScript', 'meilleures-pratiques-fullstack-javascript', 'Luc Dubois', '2025-04-18', 'Conseils pour optimiser votre workflow en tant que développeur full-stack JavaScript.', 
'# Les meilleures pratiques en développement full-stack JavaScript

Le développement full-stack avec JavaScript permet d'utiliser le même langage côté client et serveur, mais apporte aussi ses défis.

## Organisation du code

- Séparez clairement le code frontend et backend
- Utilisez des structures de dossiers cohérentes
- Partagez du code commun via des bibliothèques internes

## Gestion de l'état

Pour les applications React complexes, envisagez d'utiliser:

- Redux pour une gestion d'état globale
- Context API pour des états partagés plus simples
- React Query pour la gestion des données côté serveur

## Sécurité

N'oubliez jamais de:

- Valider les entrées utilisateur côté client ET serveur
- Utiliser HTTPS pour toutes les communications
- Implémenter une authentification robuste avec JWT ou sessions
', 'Développement Web', '["Full-stack","JavaScript","Bonnes pratiques"]');
