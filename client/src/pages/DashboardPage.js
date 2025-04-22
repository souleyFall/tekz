import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/articles`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
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

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression');
        }

        // Mise à jour de la liste des articles
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <Link to="/create-article" className="btn btn-primary">Nouvel article</Link>
      </div>

      <div className="articles-table-wrapper">
        <table className="articles-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Date</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">Aucun article trouvé</td>
              </tr>
            ) : (
              articles.map(article => (
                <tr key={article.id}>
                  <td>
                    <Link to={`/article/${article.slug}`}>{article.title}</Link>
                  </td>
                  <td>{article.author}</td>
                  <td>{new Date(article.date).toLocaleDateString('fr-FR')}</td>
                  <td>{article.category}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-small"
                      onClick={() => navigate(`/edit-article/${article.slug}`)}
                    >
                      Modifier
                    </button>
                    <button 
                      className="btn btn-small btn-danger"
                      onClick={() => handleDelete(article.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;