import React from 'react';
import './Sidebar.css';
import { FaGithub } from 'react-icons/fa';

function Sidebar() {
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
        </aside>
    );
}

export default Sidebar;