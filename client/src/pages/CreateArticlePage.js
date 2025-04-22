import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';

const CreateArticlePage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de l\'article');
      }

      const data = await response.json();
      navigate(`/article/${data.slug}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-article-page">
      <h1>Créer un nouvel article</h1>
      
      {error && <div className="error-alert">{error}</div>}
      
      <ArticleForm 
        onSubmit={handleSubmit} 
        submitLabel={loading ? 'Création en cours...' : 'Créer l\'article'} 
      />
    </div>
  );
};

export default CreateArticlePage;