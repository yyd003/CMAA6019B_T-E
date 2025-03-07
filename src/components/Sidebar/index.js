import React, { useState, useRef } from 'react';
import './Sidebar.css';
import { FaGithub } from 'react-icons/fa';

function Sidebar() {
    // Add state counter
    const [stateCount, setStateCount] = useState(0);
    
    // Add ref counter
    const refCount = useRef(0);
    
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
        <aside className="sidebar">
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