import React, { useState, useMemo, useEffect } from 'react';
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
        path: "/projects/hooks-demo", 
        name: "React Hooks Demo", 
        desc: "useCallback & useMemo",
        author: "Yao-Dong Yang",
        image: "/img/bg.jpg",
        description: "A demonstration of React performance optimization hooks.",
        fullDescription: "This demo showcases the power of React's useCallback and useMemo hooks for performance optimization. It includes practical examples of how these hooks can prevent unnecessary re-renders and expensive calculations in your React applications.",
        sourceLink: null
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
    const [renderTime, setRenderTime] = useState(0);
    const [currentTime, setCurrentTime] = useState('');
    const [isLocalTime, setIsLocalTime] = useState(false);
    
    // 获取系统时间的函数
    const fetchSystemTime = async () => {
        try {
            const response = await fetch('http://quan.suning.com/getSysTime.do');
            const data = await response.json();
            setCurrentTime(data.sysTime2);
            setIsLocalTime(false);
        } catch (error) {
            console.error('获取系统时间失败:', error);
            // 使用本地时间作为备选
            const localTime = new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setCurrentTime(localTime);
            setIsLocalTime(true);
        }
    };

    // 初始化时获取系统时间并设置定时器每秒更新
    useEffect(() => {
        fetchSystemTime();
        
        // 设置定时器每秒更新时间
        const timeInterval = setInterval(() => {
            fetchSystemTime();
        }, 1000);
        
        // 组件卸载时清除定时器
        return () => clearInterval(timeInterval);
    }, []);
    
    // 使用 useEffect 记录组件渲染和测量渲染时间
    useEffect(() => {
        const startTime = performance.now();
        
        console.log('Projects 组件渲染');
        
        // Use requestAnimationFrame to measure time after render is complete
        requestAnimationFrame(() => {
            const endTime = performance.now();
            const timeElapsed = endTime - startTime;
            setRenderTime(timeElapsed.toFixed(2));
            console.log(`Render time: ${timeElapsed.toFixed(2)}ms`);
        });
    });
    
    // 使用 useMemo 优化项目过滤逻辑
    // 只有当 searchQuery 变化时，才会重新计算过滤后的项目列表
    const filteredProjects = useMemo(() => {
        const filterStart = performance.now();
        console.log('正在计算过滤后的项目列表');
        
        const result = projectsList.filter(project => 
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        const filterEnd = performance.now();
        console.log(`Filter calculation time: ${(filterEnd - filterStart).toFixed(2)}ms`);
        
        return result;
    }, [searchQuery]);

    return (
        <div className="projects-container">
            <section className="project-list">
                <h2>Projects</h2>
                
                <div className="time-display" style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#333' }}>
                    <p>CurrentTime: {currentTime} {isLocalTime ? '(Local)' : ''}</p>
                </div>
                
                <div className="performance-metrics" style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#666' }}>
                    <p>Last render time: {renderTime}ms</p>
                </div>
                
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