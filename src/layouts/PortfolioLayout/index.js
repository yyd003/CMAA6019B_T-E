import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Home from '../../pages/Home';
import Projects from '../../pages/Projects';
import Contact from '../../pages/Contact';
import ReactDemo from '../../pages/ProjectPages/ReactDemo';
import Degas from '../../pages/ProjectPages/Degas';
import CoursePlatform from '../../features/CoursePlatform';
import GalleryPage from '../../pages/Gallery';
import './PortfolioLayout.css';
import { useFontSize } from '../../contexts/FontSizeContext';

// 懒加载组件
const ChatbotDemo = lazy(() => import('../../pages/ProjectPages/ChatbotDemo'));
const HooksDemo = lazy(() => import('../../pages/ProjectPages/HooksDemo'));

// 加载状态组件
const LoadingComponent = () => (
  <div className="loading-container">
    <p>Loading page...</p>
    <div className="loading-spinner"></div>
  </div>
);

function PortfolioLayout() {
  const { fontSize } = useFontSize();
  
  return (
    <div className="portfolio-container" style={{ fontSize: `${fontSize}rem` }}>
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/projects/react-demo" element={<ReactDemo />} />
            <Route path="/projects/degas" element={<Degas />} />
            <Route path="/projects/course-platform" element={<CoursePlatform />} />
            <Route path="/projects/chatbot-demo" element={
              <Suspense fallback={<LoadingComponent />}>
                <ChatbotDemo />
              </Suspense>
            } />
            <Route path="/projects/hooks-demo" element={
              <Suspense fallback={<LoadingComponent />}>
                <HooksDemo />
              </Suspense>
            } />
            <Route path="/projects/coming-soon" element={
              <section>
                <h2>Coming Soon</h2>
                <p>More exciting projects are on the way. Stay tuned!</p>
              </section>
            } />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default PortfolioLayout;
