import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Article non trouvé');
        }
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression');
        }

        navigate('/');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <div className="loading">Chargement de l'article...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!article) return <div className="not-found">Article non trouvé</div>;

  return (
    <div className="article-page">
      <article className="article-content">
        <header>
          <div className="article-actions">
            <Link to={`/edit-article/${slug}`} className="btn btn-small">Modifier</Link>
            <button onClick={() => handleDelete(article.id)} className="btn btn-small btn-danger">Supprimer</button>
          </div>
          
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="article-author">Par {article.author}</span>
            <span className="article-date">{new Date(article.date).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="article-tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </header>
        
        <div className="article-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;