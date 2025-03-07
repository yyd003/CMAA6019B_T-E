import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    // 项目数据
    const projectsList = [
        { path: "/projects/degas", name: "DEGAS" },
        { path: "/projects/react-demo", name: "Lab 1 React Demo" },
        { path: "/projects/course-platform", name: "Lab 2 tourial Course Platform" },
        { path: "/projects/coming-soon", name: "To Be Continued" }
    ];

    // 过滤项目列表
    const filteredProjects = projectsList.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="projects-container">
            <section className="project-list">
                <h2>Projects</h2>
                
                {/* 搜索输入框 */}
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
                
                {/* 当没有匹配结果时显示提示 */}
                {filteredProjects.length === 0 && (
                    <p style={{ color: '#666' }}>No result</p>
                )}
            </section>
        </div>
    );
}

export default Projects;