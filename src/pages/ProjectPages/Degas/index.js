import React from 'react';

function Degas() {
    return (
        <>
            <section>
                <h2>DEGAS Project</h2>
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