import React from 'react';
import Course from './Course';
import './CoursePlatform.css';

function CoursePlatform() {
  return (
    <div className="App">
      <h2>HKUST(GZ) Course Platform</h2>
      
      <div className="featured-courses">
        <h3>Featured Courses</h3>
        <Course 
          title="Creative Prototyping"
          duration="24 Hr"
          instructor="Prof. TONG"
          classroom="W4-101"
        />
      </div>

      <div className="system-notices">
        <h3>System Notices</h3>
        <div className="notice">
          <h4>Course Selection Reminder</h4>
          <p>Course selection for Fall 2025 will end on September 15th, 2025</p>
        </div>
        <div className="notice">
          <h4>Student Orientation</h4>
          <p>New student orientation will be held on September 1st, 2025</p>
        </div>
      </div>
    </div>
  );
}

export default CoursePlatform;