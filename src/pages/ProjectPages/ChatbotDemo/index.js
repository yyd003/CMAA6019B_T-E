import React, { Suspense, lazy } from 'react';

// 使用 React.lazy 懒加载 ChatInterface 组件
const ChatInterface = lazy(() => import('../../../components/ChatInterface'));

// 加载状态组件
const LoadingComponent = () => (
  <div style={{ 
    padding: '20px', 
    textAlign: 'center', 
    border: '1px dashed #ccc',
    borderRadius: '8px',
    margin: '20px 0'
  }}>
    <p>Loading ChatInterface...</p>
    <div className="loading-spinner" style={{
      display: 'inline-block',
      width: '30px',
      height: '30px',
      border: '3px solid rgba(0,0,0,.1)',
      borderRadius: '50%',
      borderTopColor: '#3498db',
      animation: 'spin 1s ease-in-out infinite'
    }}></div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function ChatbotDemo() {
  return (
    <div className="chatbot-demo-container">
      <h2>AI Chatbot Demo</h2>
      <p>This demo showcases a chatbot interface that connects to a backend OpenAI API.</p>
      <p>Try asking questions about HKUST(GZ) or any other topic!</p>
      
      {/* 使用 Suspense 包裹懒加载的组件，并提供 fallback UI */}
      <Suspense fallback={<LoadingComponent />}>
        <ChatInterface />
      </Suspense>
      
      <div className="tech-details" style={{ marginTop: '20px' }}>
        <h3>Technical Details</h3>
        <p>This component demonstrates:</p>
        <ul>
          <li>React hooks for state management</li>
          <li>Fetch API for backend communication</li>
          <li>Asynchronous JavaScript with async/await</li>
          <li>Conditional rendering based on state</li>
          <li>Lazy loading with React.lazy and Suspense</li>
        </ul>
      </div>
    </div>
  );
}

export default ChatbotDemo;