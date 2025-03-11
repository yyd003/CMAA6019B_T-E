import React, { useState, useCallback, useEffect } from 'react';
import './ChatInterface.css';

function ChatInterface() {
  // 创建三个钩子来管理对话状态
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(null);
  
  // 使用 useEffect 记录组件渲染和加载时间
  useEffect(() => {
    const startTime = performance.now();
    console.log('ChatInterface component rendering started');
    
    // 使用 requestAnimationFrame 确保在渲染完成后测量时间
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      setLoadTime(timeElapsed.toFixed(2));
      console.log(`ChatInterface component rendering completed, time: ${timeElapsed.toFixed(2)}ms`);
    });
  }, []);

  // 使用 useCallback 优化 sendMessage 函数
  const sendMessage = useCallback(async () => {
    console.log('sendMessage function created');
    // 检查输入是否为空
    if (input.trim() === '') return;
    
    // 添加用户消息到对话历史
    setMessages(prevMessages => [...prevMessages, { type: 'user', content: input }]);
    
    // 设置加载状态
    setLoading(true);
    
    try {
      // 使用fetch API发送POST请求到后端
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 添加AI响应到对话历史
        setMessages(prev => [...prev, { type: 'ai', content: data.response }]);
      } else {
        // 处理错误情况
        setMessages(prev => [...prev, { type: 'ai', content: `Error: ${data.error || 'Unknown error'}` }]);
      }
    } catch (error) {
      // 处理网络错误
      setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, there was a network error. Please try again later.' }]);
      console.error('Network error:', error);
    } finally {
      // 无论成功与否，都重置加载状态和输入框
      setLoading(false);
      setInput('');
    }
  }, [input]); // 只依赖于 input

  // 处理按Enter键发送消息
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  }, [sendMessage, loading]);

  return (
    <div className="chat-interface">
      {loadTime && (
        <div className="performance-info" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>
          Component load time: {loadTime}ms
        </div>
      )}
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}>
            <span className="message-label">
              {message.type === 'user' ? 'user' : 'ai'}:
            </span>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send your message about HKUST(GZ)"
          className="chat-input"
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading} className="chat-button">
          {loading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;