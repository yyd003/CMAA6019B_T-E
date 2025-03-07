import React, { useState } from 'react';
import './Gallery.css';

function Gallery({ project }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="gallery-container">
            <div className="gallery-image">
                <img src={project.image || '/img/bg.jpg'} alt={project.name} />
            </div>
            <div className="gallery-content">
                <h2>{project.name}</h2>
                <div className="project-meta">
                    <span>Author: {project.author || 'Yao-Dong Yang'}</span>
                    {project.sourceLink && (
                        <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                            Source Code
                        </a>
                    )}
                </div>
                <div className="project-description">
                    <p>{isExpanded ? project.fullDescription : project.description}</p>
                    {project.fullDescription && (
                        <button 
                            className="more-btn"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Gallery;