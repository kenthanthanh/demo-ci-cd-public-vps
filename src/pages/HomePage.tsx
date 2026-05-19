import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Full-Stack App
          <span className="hero-highlight"> Laravel + React + MongoDB</span>
        </h1>
        <p className="hero-subtitle">
          A modern full-stack demo project built with the latest technologies.
          Scalable architecture, containerized with Docker, and ready for production.
        </p>
        <div className="hero-actions">
          <Link to="/posts" className="btn btn-primary">
            View Demo CRUD
          </Link>
          <a
            href="https://hoidanit.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Hỏi Dân IT
          </a>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack">
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">&#9881;</div>
            <h3>Laravel (PHP)</h3>
            <p>Backend API with RESTful architecture, form request validation, and Eloquent ORM.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">&#9883;</div>
            <h3>React (TypeScript)</h3>
            <p>Frontend SPA with React Router, React Compiler, and Vite.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">&#9776;</div>
            <h3>MongoDB</h3>
            <p>NoSQL database for flexible data modeling, scalable and high-performance.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">&#9830;</div>
            <h3>Docker</h3>
            <p>Containerized services with Docker Compose, Caddy reverse proxy for production.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-check">&#10003;</span>
            <span>RESTful API with versioning (api/v1)</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">&#10003;</span>
            <span>Full CRUD operations with pagination</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">&#10003;</span>
            <span>Server-side validation with Form Requests</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">&#10003;</span>
            <span>Type-safe frontend with TypeScript</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">&#10003;</span>
            <span>Client-side routing with React Router v7</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">&#10003;</span>
            <span>Docker multi-stage builds for production</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
