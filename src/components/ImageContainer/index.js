import React from 'react';
import './ImageContainer.css';

function ImageContainer({ src, alt, className = '', aspectRatio = '4/3' }) {
    return (
        <div 
            className={`image-container ${className}`}
            style={{ aspectRatio }}
        >
            <img 
                src={src || '/img/bg.jpg'} 
                alt={alt || 'Project image'} 
            />
        </div>
    );
}

export default ImageContainer;