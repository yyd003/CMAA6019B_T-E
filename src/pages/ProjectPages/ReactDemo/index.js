import React from 'react';

function ReactDemo() {
    return (
        <>
            <section>
                <h2>Embedded Content</h2>
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