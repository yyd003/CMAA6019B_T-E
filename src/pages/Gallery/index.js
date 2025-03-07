import React from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';
import { projectsList } from '../Projects';

function GalleryPage() {
  return (
    <div className="gallery-page">
      <section className="gallery-header">
        <h1>My projects</h1>
      </section>
      
      <div className="projects-list">
        {projectsList.length > 0 ? (
          projectsList.map((project, index) => (
            <div className="project-item" key={index}>
              <div className="project-thumbnail">
                <img src={project.image || '/img/bg.jpg'} alt={project.name} />
              </div>
              <div className="project-details">
                <h2 className="project-title">{project.name}</h2>
                <div className="project-meta">
                  <span className="project-author">{project.author}</span>
                  <span className="project-tags">
                    {project.desc && (
                      <span className="tag">{project.desc}</span>
                    )}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <Link to={project.path} className="more-link">more</Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;