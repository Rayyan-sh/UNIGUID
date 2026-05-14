import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../Features/CourseSlice";
import { useNavigate } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { courses, status } = useSelector((state) => state.courses);
//console.log("CourseList work");
useEffect(() => {
  dispatch(getCourses());
}, []);

if (status === "loading") {
  return <p style={{ textAlign: "center" }}>Loading courses...</p>;
}
  return (
    <div className="course-container">
      <h2 className="title">Courses</h2>

      <div className="course-grid">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="course-card"
              onClick={() => {
  console.log("CLICKED COURSE ID:", course._id);
  navigate(`/courses/${course._id}/books`);
}}
            >
              <h3>{course.courseName}</h3>
              <p>{course.courseCode}</p>
              <p>{course.department}</p>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;