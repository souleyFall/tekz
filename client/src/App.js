import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import CreateArticlePage from './pages/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import DashboardPage from './pages/DashboardPage';
import './assets/css/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-article" element={<CreateArticlePage />} />
            <Route path="/edit-article/:slug" element={<EditArticlePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;