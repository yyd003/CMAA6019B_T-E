import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to track click positions within a designated area
 * @param {string} logName - Name to identify this hook instance in logs
 * @returns {Object} - Contains ref to attach to element, click position state, and reset function
 */
function useClickPosition(logName = 'Click Area') {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    
    const handleClick = (e) => {
      // Get element's bounding rectangle
      const rect = element.getBoundingClientRect();
      
      // Calculate click position relative to the element
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update state with new position
      setClickPosition({ x, y });
      
      // Log the click details
      console.log(`[${logName}] Click detected at position:`, {
        x: Math.round(x),
        y: Math.round(y),
        elementWidth: Math.round(rect.width),
        elementHeight: Math.round(rect.height),
        relativeX: `${Math.round((x / rect.width) * 100)}%`,
        relativeY: `${Math.round((y / rect.height) * 100)}%`,
        target: e.target.tagName.toLowerCase()
      });
    };
    
    if (element) {
      element.addEventListener('click', handleClick);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('click', handleClick);
      }
    };
  }, [logName]);
  
  // Function to reset the click position
  const resetClickPosition = () => {
    setClickPosition({ x: 0, y: 0 });
  };
  
  return {
    ref: elementRef,
    clickPosition,
    resetClickPosition
  };
}

export default useClickPosition;