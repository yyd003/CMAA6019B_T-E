import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Home from '../../pages/Home';
import Projects from '../../pages/Projects';
import Contact from '../../pages/Contact';
// 移除直接导入
// import ReactDemo from '../../pages/ProjectPages/ReactDemo';
// import Degas from '../../pages/ProjectPages/Degas';
import CoursePlatform from '../../features/CoursePlatform';
import GalleryPage from '../../pages/Gallery';
import './PortfolioLayout.css';
import { useFontSize } from '../../contexts/FontSizeContext';

// 懒加载组件
const ChatbotDemo = lazy(() => import('../../pages/ProjectPages/ChatbotDemo'));
const HooksDemo = lazy(() => import('../../pages/ProjectPages/HooksDemo'));
// 添加新的懒加载组件
const ReactDemo = lazy(() => import('../../pages/ProjectPages/ReactDemo'));
const Degas = lazy(() => import('../../pages/ProjectPages/Degas'));

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
            {/* 修改为懒加载方式 */}
            <Route path="/projects/react-demo" element={
              <Suspense fallback={<LoadingComponent />}>
                <ReactDemo />
              </Suspense>
            } />
            <Route path="/projects/degas" element={
              <Suspense fallback={<LoadingComponent />}>
                <Degas />
              </Suspense>
            } />
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
