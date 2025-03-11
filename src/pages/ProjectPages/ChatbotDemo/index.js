import React from 'react';
import ChatInterface from '../../../components/ChatInterface';

function ChatbotDemo() {
  return (
    <div className="chatbot-demo-container">
      <h2>AI Chatbot Demo</h2>
      <p>This demo showcases a chatbot interface that connects to a backend OpenAI API.</p>
      <p>Try asking questions about HKUST(GZ) or any other topic!</p>
      
      <ChatInterface />
      
      <div className="tech-details" style={{ marginTop: '20px' }}>
        <h3>Technical Details</h3>
        <p>This component demonstrates:</p>
        <ul>
          <li>React hooks for state management</li>
          <li>Fetch API for backend communication</li>
          <li>Asynchronous JavaScript with async/await</li>
          <li>Conditional rendering based on state</li>
        </ul>
      </div>
    </div>
  );
}

export default ChatbotDemo;