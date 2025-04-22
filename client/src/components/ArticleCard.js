import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2 className="article-title">
        <Link to={`/article/${article.slug}`}>{article.title}</Link>
      </h2>
      <div className="article-meta">
        <span className="article-author">{article.author}</span>
        <span className="article-date">{new Date(article.date).toLocaleDateString('fr-FR')}</span>
      </div>
      <p className="article-excerpt">{article.excerpt}</p>
      <div className="article-tags">
        {article.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;