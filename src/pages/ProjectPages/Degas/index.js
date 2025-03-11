import React from 'react';
// 修正导入路径，使用正确的相对路径
import useRenderTime from '../../../hooks/useRenderTime';

function Degas() {
    // 使用自定义 Hook 测量渲染时间
    const renderTime = useRenderTime('Degas', []);
    
    return (
        <>
            <section>
                <h2>DEGAS Project</h2>
                <div className="performance-metrics" style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#666' }}>
                    <p>component render time: {renderTime}ms</p>
                </div>
                <p>This project demonstrates Dense Geometry-Aware Synthesis for Single-View Novel View Synthesis.</p>
                <iframe 
                    src="https://initialneil.github.io/DEGAS" 
                    width="100%" 
                    height="600" 
                    title="DEGAS Project"
                    style={{ border: 'none' }}
                ></iframe>
            </section>
            <section>
                <h2>Project Features</h2>
                <ul>
                    <li>Novel View Synthesis</li>
                    <li>Dense Geometry-Aware Synthesis</li>
                    <li>Single-View Processing</li>
                </ul>
            </section>
        </>
    );
}

export default Degas;