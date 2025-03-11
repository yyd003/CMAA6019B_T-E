import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 将项目数据移到这里作为统一数据源
export const projectsList = [
    { 
        path: "/projects/degas", 
        name: "DEGAS", 
        desc: "Deep Learning Project",
        author: "Yao-Dong Yang",
        image: "/img/bg.jpg",
        description: "A deep learning project focused on computer vision and artificial intelligence.",
        fullDescription: "DEGAS (Deep Learning Enhanced Graphics and Analysis System) is an innovative project that combines state-of-the-art deep learning techniques with practical applications in computer vision. This project demonstrates the power of AI in solving complex visual recognition tasks.",
        sourceLink: "https://initialneil.github.io/DEGAS"
    },
    { 
        path: "/projects/react-demo", 
        name: "Lab 1 React Demo", 
        desc: "Interactive Components",
        author: "Yao-Dong Yang",
        image: "/img/bg.jpg",
        description: "A collection of interactive React components.",
        fullDescription: "Showcase of various React components demonstrating modern web development practices and UI/UX patterns.",
        sourceLink: null
    },
    { 
        path: "/projects/course-platform", 
        name: "Lab 2 tourial Course Platform", 
        desc: "Educational System",
        author: "Yao-Dong Yang",
        image: "/img/bg.jpg",
        description: "An online learning platform built with React.",
        fullDescription: "A comprehensive educational platform featuring course management, student tracking, and interactive learning materials.",
        sourceLink: null
    },
    { 
        path: "/projects/chatbot-demo", 
        name: "Lab 5 Chatbot Demo", 
        desc: "AI Conversation Interface",
        author: "Yao-Dong Yang",
        image: "/img/bg.jpg",
        description: "An interactive chatbot powered by OpenAI API.",
        fullDescription: "This demo showcases a chatbot interface that connects to a backend OpenAI API, allowing users to interact with large language models directly on the website.",
        sourceLink: null
    },
    { 
        path: "/projects/coming-soon", 
        name: "To Be Continued", 
        desc: "More Coming Soon",
        author: "Yao-Dong Yang",
        image: "/img/bg.jpg",
        description: "Exciting new projects in development.",
        fullDescription: "Stay tuned for more innovative projects combining AI, web development, and educational technology.",
        sourceLink: null
    }
];

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredProjects = projectsList.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="projects-container">
            <section className="project-list">
                <h2>Projects</h2>
                
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="filter by project name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '8px',
                            marginBottom: '20px',
                            width: '200px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <ul>
                    {filteredProjects.map((project, index) => (
                        <li key={index}>
                            <Link to={project.path}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
                
                {filteredProjects.length === 0 && (
                    <p style={{ color: '#666' }}>No result</p>
                )}
            </section>
        </div>
    );
}

export default Projects;