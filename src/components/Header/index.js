import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header id="site-header">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
}

export default Header;