import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';

const EditArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'article');
      }

      const data = await response.json();
      navigate(`/article/${data.slug}`);
    } catch (error) {
      setError(error.message);
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Chargement de l'article...</div>;
  if (error && !article) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="edit-article-page">
      <h1>Modifier l'article</h1>
      
      {error && <div className="error-alert">{error}</div>}
      
      <ArticleForm 
        article={article} 
        onSubmit={handleSubmit} 
        submitLabel={submitting ? 'Mise à jour en cours...' : 'Mettre à jour'} 
      />
    </div>
  );
};

export default EditArticlePage;