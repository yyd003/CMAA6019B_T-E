import React from 'react';
// 修正导入路径，使用正确的相对路径
import useRenderTime from '../../../hooks/useRenderTime';

function ReactDemo() {
    // 使用自定义 Hook 测量渲染时间
    const renderTime = useRenderTime('ReactDemo', []);
    
    return (
        <>
            <section>
                <h2>Embedded Content</h2>
                <div className="performance-metrics" style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#666' }}>
                    <p>component render time: {renderTime}ms</p>
                </div>
                <p>This sub-project demonstrates the use of an iFrame, list, and button elements.</p>
                <iframe src="https://www.example.com" width="300" height="200" title="Example Site"></iframe>
            </section>
            <section>
                <h2>Features List</h2>
                <ul>
                    <li>Feature A</li>
                    <li>Feature B</li>
                    <li>Feature C</li>
                </ul>
            </section>
            <section>
                <h2>Action</h2>
                <button onClick={() => alert('Button clicked!')}>Click Me!</button>
            </section>
        </>
    );
}

export default ReactDemo;