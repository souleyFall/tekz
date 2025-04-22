import React, { useState } from 'react';

const ArticleForm = ({ article = {}, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState({
    title: article.title || '',
    author: article.author || '',
    excerpt: article.excerpt || '',
    content: article.content || '',
    category: article.category || 'Développement Web',
    tags: (article.tags && article.tags.join(', ')) || ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur si l'utilisateur commence à saisir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est obligatoire';
    if (!formData.author.trim()) newErrors.author = 'L\'auteur est obligatoire';
    if (!formData.content.trim()) newErrors.content = 'Le contenu est obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Transformer les tags de string en array
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };
    
    onSubmit(processedData);
  };
  
  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Auteur*</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="excerpt">Extrait</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows="2"
        />
        <small>Laissez vide pour générer automatiquement à partir du contenu</small>
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Contenu (Markdown)*</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="15"
          className={errors.content ? 'error' : ''}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Développement Web">Développement Web</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Intelligence Artificielle">Intelligence Artificielle</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="tags">Tags (séparés par des virgules)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="ex: JavaScript, React, Tutorial"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{submitLabel || 'Enregistrer'}</button>
      </div>
    </form>
  );
};

export default ArticleForm;