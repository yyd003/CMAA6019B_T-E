import React, { useState, useEffect, useRef } from 'react';
import Gallery from '../../components/Gallery';
import { Link } from 'react-router-dom';
import './Home.css';
// 修改导入路径，从Projects组件导入项目数据
import { projectsList } from '../Projects';
import useClickPosition from '../../hooks/useClickPosition';
// 导入自定义 Hook
import useRenderTime from '../../hooks/useRenderTime';

function Home() {
    // 移除未使用的 theme 和 toggleTheme
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    // 添加监听状态和引用
    const [hoveredElement, setHoveredElement] = useState(null);
    const homeContainerRef = useRef(null);

    // 使用自定义 Hook 测量整个 Home 组件的渲染时间
    const homeRenderTime = useRenderTime('Home', []);
    
    // 使用自定义 Hook 测量 Hero 部分的渲染时间
    const heroRef = useRef(null);
    const heroRenderTime = useRenderTime('Hero Section', []);

    // Use our custom hook for different sections
    const heroSection = useClickPosition('Hero Section');
    const aboutSection = useClickPosition('About Section');
    const projectsSection = useClickPosition('Projects Section');

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
            console.log(`Mouse entered element: ${elementInfo}`);
        };

        const handleMouseLeave = (e) => {
            console.log(`Mouse left element: ${hoveredElement}`);
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

    // 项目数据已从 Projects 组件导入
    
    // Implement automatic carousel with pause on user interaction
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % projectsList.length);
        }, 10000); // Move every 10 seconds
        
        return () => clearInterval(interval);
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
            prevIndex === 0 ? projectsList.length - 1 : prevIndex - 1
        );
    };

    const goToRight = () => {
        handleUserInteraction();
        setCurrentIndex(prevIndex => 
            (prevIndex + 1) % projectsList.length
        );
    };

    // Calculate visible projects for carousel with looping
    const visibleProjects = [];
    for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % projectsList.length;
        visibleProjects.push(projectsList[index]);
    }
    
    const displayedProjects = showAllProjects ? projectsList : projectsList.slice(0, 3);

    return (
        <div className="home-container" ref={homeContainerRef}>
            <div className="performance-metrics" style={{ padding: '10px', fontSize: '0.8rem', color: '#666', backgroundColor: 'rgba(0,0,0,0.05)', marginBottom: '10px', borderRadius: '4px' }}>
                <p>Home component render time: {homeRenderTime}ms</p>
            </div>
            
            <section className="hero" ref={(el) => { heroSection.ref.current = el; heroRef.current = el; }}>
                <audio 
                    src="/audio/j.fla-Payphone.mp3" 
                    autoPlay 
                    loop 
                    controls 
                />
                {/* Display click position for demonstration */}
                <p className="click-info">
                    Last click in Hero: X: {Math.round(heroSection.clickPosition.x)}, 
                    Y: {Math.round(heroSection.clickPosition.y)}
                </p>
                <p className="performance-info" style={{ fontSize: '0.8rem', color: '#666' }}>
                    Hero component render time: {heroRenderTime}ms
                </p>
            </section>

            <section className="about" ref={aboutSection.ref}>
                <h2>About Me</h2>
                <p>I am a passionate developer focused on full-stack development and AI applications.</p>
                <div className="skills">
                    <h3>Technical Skills</h3>
                    <ul>
                        <li>Frontend: React, JavaScript, HTML5, CSS3</li>
                        <li>Backend: JAVA, Python</li>
                        <li>Others: Git, Docker</li>
                    </ul>
                </div>
                {/* Display click position for demonstration */}
                <p className="click-info">
                    Last click in About: X: {Math.round(aboutSection.clickPosition.x)}, 
                    Y: {Math.round(aboutSection.clickPosition.y)}
                </p>
            </section>

            <section className="featured-projects" ref={projectsSection.ref}>
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
                                <div className="project-card-image">
                                    <img 
                                        src={project.image || '/img/bg.jpg'} 
                                        alt={project.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
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