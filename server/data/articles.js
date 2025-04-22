let articles = [
    {
      id: 1,
      title: "Les fondamentaux de React.js",
      slug: "fondamentaux-react-js",
      author: "Jean Dupont",
      date: "2025-04-10",
      excerpt: "Découvrez les concepts de base de React et comment créer vos premières applications.",
      content: `
        # Les fondamentaux de React.js
        
        React est une bibliothèque JavaScript populaire pour la création d'interfaces utilisateur, particulièrement pour les applications à page unique (SPA).
        
        ## Pourquoi React?
        
        - **Composants réutilisables**: Créez des éléments d'interface modulaires
        - **DOM virtuel**: Optimisation des performances
        - **Écosystème riche**: De nombreuses bibliothèques complémentaires
        
        ## Comment démarrer
        
        Pour commencer avec React, vous devez d'abord installer Node.js, puis créer une nouvelle application avec Create React App:
        
        \`\`\`bash
        npx create-react-app mon-application
        cd mon-application
        npm start
        \`\`\`
        
        ## Les Hooks
        
        Les Hooks sont une fonctionnalité introduite dans React 16.8 qui permet d'utiliser l'état et d'autres fonctionnalités de React sans écrire de classe.
      `,
      category: "Développement Web",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Node.js et Express: Créer une API RESTful",
      slug: "nodejs-express-api-restful",
      author: "Marie Laurent",
      date: "2025-04-15",
      excerpt: "Apprenez à construire une API robuste avec Node.js et Express.",
      content: `
        # Node.js et Express: Créer une API RESTful
        
        Express est un framework minimaliste pour Node.js qui facilite la création d'applications web et d'APIs.
        
        ## Configuration de base
        
        Commencez par initialiser votre projet et installer Express:
        
        \`\`\`bash
        mkdir mon-api
        cd mon-api
        npm init -y
        npm install express
        \`\`\`
        
        ## Structure de l'API
        
        Une bonne pratique est d'organiser votre API avec des routes, des contrôleurs et des modèles:
        
        \`\`\`javascript
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
        \`\`\`
        
        ## Middleware
        
        Les middleware sont des fonctions qui ont accès à l'objet de requête, à l'objet de réponse et à la fonction next() dans le cycle de requête-réponse.
      `,
      category: "Backend",
      tags: ["Node.js", "Express", "API", "JavaScript"]
    },
    {
      id: 3,
      title: "Les meilleures pratiques en développement full-stack JavaScript",
      slug: "meilleures-pratiques-fullstack-javascript",
      author: "Luc Dubois",
      date: "2025-04-18",
      excerpt: "Conseils pour optimiser votre workflow en tant que développeur full-stack JavaScript.",
      content: `
        # Les meilleures pratiques en développement full-stack JavaScript
        
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
      `,
      category: "Développement Web",
      tags: ["Full-stack", "JavaScript", "Bonnes pratiques"]
    }
  ];
  
  // Fonction pour générer un nouvel ID
  const generateId = () => {
    return Math.max(...articles.map(article => article.id), 0) + 1;
  };
  
  // Fonction pour générer un slug à partir d'un titre
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  module.exports = {
    getAll: () => articles.map(({ id, title, slug, author, date, excerpt, category, tags }) => ({
      id, title, slug, author, date, excerpt, category, tags
    })),
    
    getBySlug: (slug) => articles.find(a => a.slug === slug),
    
    getById: (id) => articles.find(a => a.id === parseInt(id)),
    
    create: (articleData) => {
      const newArticle = {
        id: generateId(),
        slug: generateSlug(articleData.title),
        date: new Date().toISOString().split('T')[0],
        ...articleData
      };
      articles.push(newArticle);
      return newArticle;
    },
    
    update: (id, articleData) => {
      const index = articles.findIndex(a => a.id === parseInt(id));
      if (index === -1) return null;
      
      // Si le titre a changé, générer un nouveau slug
      const newSlug = articleData.title !== articles[index].title 
        ? generateSlug(articleData.title) 
        : articles[index].slug;
      
      articles[index] = {
        ...articles[index],
        ...articleData,
        slug: newSlug
      };
      
      return articles[index];
    },
    
    delete: (id) => {
      const index = articles.findIndex(a => a.id === parseInt(id));
      if (index === -1) return false;
      
      articles.splice(index, 1);
      return true;
    }
  };
  