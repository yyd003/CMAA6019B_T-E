import React, { useState, useEffect, useRef } from 'react';
import Gallery from '../../components/Gallery';
import { Link } from 'react-router-dom';
import './Home.css';
import projects from '../../data/projects';
import { useTheme } from '../../contexts/ThemeContext';

function Home() {
    // 使用全局主题上下文
    const { theme, toggleTheme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    // 添加监听状态和引用
    const [hoveredElement, setHoveredElement] = useState(null);
    const homeContainerRef = useRef(null);

    // 移除本地主题状态和相关逻辑，使用全局主题

    // 添加通用元素监听功能
    useEffect(() => {
        const container = homeContainerRef.current;
        
        const handleMouseEnter = (e) => {
            const tagName = e.target.tagName.toLowerCase();
            const className = e.target.className;
            const id = e.target.id;
            
            const elementInfo = id ? `#${id}` : 
                               className ? `.${className.split(' ')[0]}` : 
                               tagName;
            
            setHoveredElement(elementInfo);
            console.log(`鼠标进入元素: ${elementInfo}`);
        };

        const handleMouseLeave = (e) => {
            console.log(`鼠标离开元素: ${hoveredElement}`);
            setHoveredElement(null);
        };

        // 为容器内的所有元素添加事件委托
        if (container) {
            container.addEventListener('mouseover', handleMouseEnter);
            container.addEventListener('mouseout', handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener('mouseover', handleMouseEnter);
                container.removeEventListener('mouseout', handleMouseLeave);
            }
        };
    }, [hoveredElement]);

    // 项目数据已移至 src/data/projects.js
    
    // Implement automatic carousel with pause on user interaction
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);
        }, 10000); // Move every 10 seconds
        
        return () => clearInterval(interval);
    // 移除 projects.length 依赖项，只保留 isPaused
    }, [isPaused]);
    
    // Temporarily pause automatic cycling when user interacts
    const handleUserInteraction = () => {
        setIsPaused(true);
        
        // Resume automatic cycling after 30 seconds of inactivity
        const timeout = setTimeout(() => {
            setIsPaused(false);
        }, 30000);
        
        return () => clearTimeout(timeout);
    };

    const goToLeft = () => {
        handleUserInteraction();
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const goToRight = () => {
        handleUserInteraction();
        setCurrentIndex(prevIndex => 
            (prevIndex + 1) % projects.length
        );
    };

    // Calculate visible projects for carousel with looping
    const visibleProjects = [];
    for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % projects.length;
        visibleProjects.push(projects[index]);
    }
    
    const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

    return (
        <div className="home-container" ref={homeContainerRef}>
            {/* 移除主题切换按钮 */}
            <section className="hero">
                <audio 
                    src="/audio/j.fla-Payphone.mp3" 
                    autoPlay 
                    loop 
                    controls 
                />
            </section>

            <section className="about">
                <h2>About Me</h2>
                <p>I am a passionate developer focused on full-stack development and AI applications.</p>
                <div className="skills">
                    <h3>Technical Skills</h3>
                    <ul>
                        <li>Frontend: React, JavaScript, HTML5, CSS3</li>
                        <li>Backend: JAVA</li>
                        <li>Others: Git, Docker</li>
                    </ul>
                </div>
            </section>

            <section className="featured-projects">
                <h2>Featured Projects</h2>
                <div className="project-gallery">
                    <button 
                        onClick={goToLeft}
                        className="gallery-btn"
                    >
                        &lt;
                    </button>
                    
                    <div className="project-cards">
                        {visibleProjects.map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="project-card-image"></div>
                                <h3>{project.name}</h3>
                                <p>{project.desc}</p>
                                <Link to={project.path}>Learn More</Link>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={goToRight}
                        className="gallery-btn"
                    >
                        &gt;
                    </button>
                </div>
            </section>

            <section className="project-highlight">
                <h2>Project Details</h2>
                <div className="gallery-container">
                    {displayedProjects.map((project, index) => (
                        <Gallery key={index} project={project} />
                    ))}
                    <button 
                        className="toggle-projects-btn"
                        onClick={() => setShowAllProjects(!showAllProjects)}
                    >
                        {showAllProjects ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </section>

            <section className="education">
                <h2>Education</h2>
                <p>Hong Kong University of Science and Technology (Guangzhou)</p>
                <p>Phd Student at CMA Thrust</p>
            </section>
        </div>
    );
}

export default Home;