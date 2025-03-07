import React, { useState, useEffect } from 'react';

function Contact({title, className, style, defaultName = '', ...otherProps }) {
    const [userName, setUserName] = useState(defaultName);
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });

    useEffect(() => {
        // 获取设备信息作为默认用户名
        if (window.navigator.userAgent.includes('Windows')) {
            const osUserName = process.env.USERNAME || process.env.USER;
            if (osUserName) setUserName(osUserName);
        }

        // 从 localStorage 获取保存的用户信息
        const savedName = localStorage.getItem('userName');
        const savedEmail = localStorage.getItem('userEmail');
        if (savedName) setUserName(savedName);
        if (savedEmail) setFormData(prev => ({...prev, email: savedEmail}));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 如果传入了自定义的提交处理函数，则调用它
        if (otherProps.onSubmit) {
            otherProps.onSubmit({
                name: userName,
                ...formData
            });
        }
        console.log('Form submitted:', {
            name: userName,
            ...formData
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setUserName(value);
            localStorage.setItem('userName', value);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            if (name === 'email') {
                localStorage.setItem('userEmail', value);
            }
        }
    };

    return (
        <section 
            className={className} 
            style={style} 
            {...otherProps}
            data-testid="contact-form"
        >
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={userName}
                    onChange={handleInputChange}
                    required 
                /><br />

                <label htmlFor="email">Email:</label><br />
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                /><br />

                <label htmlFor="message">Message:</label><br />
                <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                /><br />

                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

Contact.defaultProps = {
    title: "Contact Us",
    className: "contact-form",
    style: { maxWidth: "500px", margin: "0 auto" }
};

export default Contact;