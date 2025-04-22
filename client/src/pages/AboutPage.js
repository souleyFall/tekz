import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>À propos de Tekz</h1>
      <section className="about-content">
        <p>Tekz est un blog dédié à l'informatique et au développement web, créé pour partager des connaissances, des tutoriels et des actualités dans le domaine de la technologie.</p>
        
        <h2>Notre mission</h2>
        <p>Nous croyons que la connaissance doit être accessible à tous. Notre objectif est de simplifier des concepts complexes et de fournir des ressources de qualité pour aider les développeurs de tous niveaux à améliorer leurs compétences.</p>
        
        <h2>Nos sujets</h2>
        <ul>
          <li>Développement web frontend (React, Vue, Angular)</li>
          <li>Développement backend (Node.js, Express, Django)</li>
          <li>DevOps et déploiement</li>
          <li>Bonnes pratiques et architecture</li>
          <li>Nouvelles technologies et tendances</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;