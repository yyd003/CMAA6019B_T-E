import React from 'react';
import './Student.css';

function Student({ name, id, major, grade }) {
  return (
    <div className="student-item">
      <h3>{name}</h3>
      <p>Student ID: {id}</p>
      <p>Major: {major}</p>
      <p>Grade: {grade}</p>
      <div className="student-controls">
        <button>View Profile</button>
        <button>Edit Information</button>
      </div>
    </div>
  );
}

export default Student;