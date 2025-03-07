import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PortfolioLayout from './layouts/PortfolioLayout';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
function App() {
    return (
        <ThemeProvider>
            <Router>
                <PortfolioLayout />
            </Router>
        </ThemeProvider>
    );
}

export default App;