import React, { useState } from 'react';
import './Course.css';

function Course({ title, duration, instructor, classroom }) {
  const [studentCount, setStudentCount] = useState(0);

  const handleIncrease = () => {
    setStudentCount(prevCount => prevCount + 1);
  };

  const handleDecrease = () => {
    setStudentCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  };

  return (
    <div className="course-item">
      <h3>{title}</h3>
      <p>Duration: {duration}</p>
      <p>Instructor: {instructor}</p>
      <p>Classroom: {classroom}</p>
      <div className="course-controls">
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
      </div>
      <p>There are {studentCount} students choosing the course</p>
    </div>
  );
}

export default Course;