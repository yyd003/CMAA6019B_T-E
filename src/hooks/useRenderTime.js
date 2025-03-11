import { useState, useEffect } from 'react';

/**
 * 自定义 Hook，用于测量组件渲染时间
 * @param {string} componentName - 组件名称，用于日志输出
 * @param {Array} dependencies - 依赖数组，当这些依赖变化时重新测量渲染时间
 * @returns {string} 渲染时间（毫秒）
 */
function useRenderTime(componentName, dependencies = []) {
  const [renderTime, setRenderTime] = useState(0);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const startTime = performance.now();
    
    console.log(`${componentName} 组件渲染中`);
    
    // 使用 requestAnimationFrame 确保在渲染完成后测量时间
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      setRenderTime(timeElapsed.toFixed(2));
      console.log(`${componentName} 渲染时间: ${timeElapsed.toFixed(2)}ms`);
    });
  }, [componentName, ...(Array.isArray(dependencies) ? dependencies : [])]);
  
  return renderTime;
}

export default useRenderTime;