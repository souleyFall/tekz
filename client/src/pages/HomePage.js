import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/articles`);
        if (!response.ok) {
          throw new Error('Erreur réseau lors de la récupération des articles');
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="loading">Chargement des articles...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="home-page">
      <section className="hero">
        <h1>TEKZ</h1>
        <p>Explorez le monde de la technologie et du développement</p>
      </section>

      <section className="articles-section">
        <h2>Articles récents</h2>
        <div className="articles-grid">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;