import React, { useState, useMemo, useCallback, useEffect } from 'react';

function HooksDemo() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // 使用 useEffect 记录组件渲染
  useEffect(() => {
    console.log('HooksDemo 组件渲染');
  });
  
  // 使用 useMemo 缓存计算结果
  // 只有当 isDarkMode 变化时，才会重新计算样式
  const containerStyle = useMemo(() => {
    console.log('计算容器样式');
    return {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#333' : '#fff',
      padding: '20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      border: '1px solid #ddd'
    };
  }, [isDarkMode]);
  
  // 使用 useMemo 进行昂贵计算的模拟
  const expensiveComputation = useMemo(() => {
    console.log('执行昂贵计算');
    // 模拟昂贵计算
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  }, []); // 空依赖数组意味着只计算一次
  
  // 使用 useCallback 优化事件处理函数
  const handleIncrement = useCallback(() => {
    console.log('handleIncrement 函数被创建');
    setCount(prevCount => prevCount + 1);
  }, []);
  
  const handleToggleTheme = useCallback(() => {
    console.log('handleToggleTheme 函数被创建');
    setIsDarkMode(prevMode => !prevMode);
  }, []);
  
  const handleInputChange = useCallback((e) => {
    console.log('handleInputChange 函数被创建');
    setInputText(e.target.value);
  }, []);
  
  return (
    <div style={containerStyle}>
      <h2>React Hooks Optimization Demo</h2>
      
      <section>
        <h3>useMemo Demonstration</h3>
        <p>Expensive calculation result: {expensiveComputation}</p>
        <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
        <button onClick={handleToggleTheme}>
          Toggle Theme
        </button>
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>useCallback Demonstration</h3>
        <p>Counter: {count}</p>
        <button onClick={handleIncrement}>
          Increment
        </button>
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>Input Test</h3>
        <p>When you type in the input field, the component re-renders but expensive calculations are not repeated</p>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type text here"
          style={{ padding: '8px', width: '100%', marginTop: '10px' }}
        />
        <p>Input text: {inputText}</p>
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>Technical Details</h3>
        <ul>
          <li><strong>useMemo</strong>: Caches computation results, preventing expensive calculations from being repeated on every render</li>
          <li><strong>useCallback</strong>: Caches function references, preventing new function instances from being created on every render</li>
          <li>Open the browser console to see logs of component renders and function creations</li>
        </ul>
      </section>
    </div>
  );
}

export default HooksDemo;