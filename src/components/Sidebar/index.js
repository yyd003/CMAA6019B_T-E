import React, { useState, useRef } from 'react';
import './Sidebar.css';
import { FaGithub } from 'react-icons/fa';
import { useFontSize } from '../../contexts/FontSizeContext';

function Sidebar() {
    // Add state counter
    const [stateCount, setStateCount] = useState(0);
    
    // Add ref counter
    const refCount = useRef(0);
    
    // Use the font size context
    const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();
    
    // Handler for state counter
    const handleAddState = () => {
        setStateCount(stateCount + 1);
    };
    
    // Handler for ref counter
    const handleAddRef = () => {
        refCount.current += 1;
        console.log("Current ref value:", refCount.current);
    };
    
    return (
        <aside className="sidebar" style={{ fontSize: `${fontSize}rem` }}>
            <div className="profile">
                <img 
                    src="/img/figure.png" 
                    alt="Profile" 
                    className="avatar"
                />
                <h3>Yao-Dong 'Polite' Yang</h3>
                <p>politeydy@hkust-gz.edu.cn</p>
                <div className="social-links">
                    <a 
                        href="https://github.com/yyd003" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <FaGithub size={24} />
                    </a>
                </div>
            </div>
            
            {/* Font size controls */}
            <div className="font-size-controls">
                <h4>Accessibility</h4>
                <div className="font-size-buttons">
                    <p>Font Size: {fontSize.toFixed(1)}x</p>
                    <div className="button-group">
                        <button onClick={decreaseFontSize}>Decrease</button>
                        <button onClick={increaseFontSize}>Increase</button>
                    </div>
                </div>
            </div>
            
            {/* Counter demonstration section */}
            <div className="counter-demo">
                <h4>Hook Demonstration</h4>
                <div className="counter-container">
                    <p>State Count: {stateCount}</p>
                    <p>Ref Count: {refCount.current}</p>
                    <button onClick={handleAddState}>Add State</button>
                    <button onClick={handleAddRef}>Add Ref</button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;