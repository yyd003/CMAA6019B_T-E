import React, { useState } from 'react';
import './ChatInterface.css';

function ChatInterface() {
  // 创建三个钩子来管理对话状态
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 发送消息到后端并获取响应
  const sendMessage = async () => {
    // 检查输入是否为空
    if (input.trim() === '') return;
    
    // 添加用户消息到对话历史
    setMessages([...messages, { type: 'user', content: input }]);
    
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
  };

  // 处理按Enter键发送消息
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div style={styles.chatInterface}>
      <div style={styles.chatHistory}>
        {messages.map((message, index) => (
          <div key={index} style={{...styles.message, ...(message.type === 'user' ? styles.userMessage : styles.aiMessage)}}>
            <span style={styles.messageLabel}>
              {message.type === 'user' ? 'user' : 'ai'}:
            </span>
            {message.content}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send your message about HKUST(GZ)"
          style={styles.chatInput}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading} style={styles.chatButton}>
          {loading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
}

// 内联样式
const styles = {
  chatInterface: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  chatHistory: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  message: {
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '18px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  userMessage: {
    backgroundColor: '#e3f2fd',
    marginLeft: 'auto',
    textAlign: 'right',
  },
  aiMessage: {
    backgroundColor: '#f1f0f0',
    marginRight: 'auto',
  },
  messageLabel: {
    fontWeight: 'bold',
    marginRight: '8px',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  },
  chatInput: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    marginRight: '10px',
    fontSize: '16px',
  },
  chatButton: {
    padding: '10px 15px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default ChatInterface;