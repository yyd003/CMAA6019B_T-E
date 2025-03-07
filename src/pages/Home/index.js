import React, { useState,useEffect } from 'react';
import Gallery from '../../components/Gallery';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [theme, setTheme] = useState('light');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const projects = [
        { 
            path: "/projects/degas", 
            name: "DEGAS", 
            desc: "Deep Learning Project",
            author: "Yao-Dong Yang",
            image: "/img/bg.jpg",
            description: "A deep learning project focused on computer vision and artificial intelligence.",
            fullDescription: "DEGAS (Deep Learning Enhanced Graphics and Analysis System) is an innovative project that combines state-of-the-art deep learning techniques with practical applications in computer vision. This project demonstrates the power of AI in solving complex visual recognition tasks.",
            sourceLink: "https://github.com/yourusername/degas"
        },
        { 
            path: "/projects/react-demo", 
            name: "React Demo", 
            desc: "Interactive Components",
            author: "Yao-Dong Yang",
            image: "/img/bg.jpg",
            description: "A collection of interactive React components.",
            fullDescription: "Showcase of various React components demonstrating modern web development practices and UI/UX patterns.",
            sourceLink: "https://github.com/yourusername/react-demo"
        },
        { 
            path: "/projects/course-platform", 
            name: "Course Platform", 
            desc: "Educational System",
            author: "Yao-Dong Yang",
            image: "/img/bg.jpg",
            description: "An online learning platform built with React.",
            fullDescription: "A comprehensive educational platform featuring course management, student tracking, and interactive learning materials.",
            sourceLink: "https://github.com/yourusername/course-platform"
        },
        { 
            path: "/projects/coming-soon", 
            name: "Future Projects", 
            desc: "More Coming Soon",
            author: "Yao-Dong Yang",
            image: "/img/bg.jpg",
            description: "Exciting new projects in development.",
            fullDescription: "Stay tuned for more innovative projects combining AI, web development, and educational technology.",
            sourceLink: null
        }
    ];
    
    // Implement automatic carousel with pause on user interaction
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);
        }, 10000); // Move every 10 seconds
        
        return () => clearInterval(interval);
    }, [projects.length, isPaused]);
    
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
        <div className="home-container">
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
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