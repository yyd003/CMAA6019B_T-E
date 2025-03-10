import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PortfolioLayout from './layouts/PortfolioLayout';
import './App.css';
import './styles/theme.css'; // 导入全局主题 CSS
import { ThemeProvider } from './contexts/ThemeContext';
import { FontSizeProvider } from './contexts/FontSizeContext';

function App() {
    return (
        <ThemeProvider>
            <FontSizeProvider>
                <Router>
                    <PortfolioLayout />
                </Router>
            </FontSizeProvider>
        </ThemeProvider>
    );
}

export default App;