import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "./TeachersInfo.css";
import "./All.css";

export default function TeachersInfo() {
  const [teachers, setTeachers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teachers")) || [];
    setTeachers(data);
  }, []);

  const handleEdit = (teacher, index) => {
    navigate("/addteachers", { state: { teacher, index } });
  };

  const filteredTeachers = searchId
    ? teachers.filter((tea) => tea.tID.toString() === searchId)
    : teachers;

  const handleDelete = (index) => {
    const updatedTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(updatedTeachers);
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
  };

  return (
    <div>
      <Header />
      <div className="ul">
        <ul>
          <li className="linkHome">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="linkHome">
            <Link to={"/addstudents"}>Add Student Info</Link>
          </li>
          <li className="linkHome">
            <Link to={"/studentsInfo"}>Students Info</Link>
          </li>
          <li className="linkHome">
            <Link to={"/addteachers"}>Add Teachers Info</Link>
          </li>
          <li className="linkHome">
            <Link to={"/fees"}>Students Fees</Link>
          </li>
        </ul>

        <p className="secTitle">Teachers Info</p>

        <div className="searchContainer">
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search by Teachers ID"
              className="searchInput"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="searchBtn" onClick={() => setSearchId("")}>
              Search
            </button>
          </div>
        </div>

        <div className="card-container">
          {filteredTeachers.map((tea, i) => (
            <div key={i} className="teacher-card">
              <h3>{tea.tName}</h3>
              <p>
                <strong>ID:</strong> <span>{tea.tID}</span>
              </p>
              <p>
                <strong>Subject:</strong> <span>{tea.Subject}</span>
              </p>
              <p>
                <strong>Address:</strong> <span>{tea.Address}</span>
              </p>
              <p>
                <strong>Contact:</strong> <span>{tea.Contact}</span>
              </p>
              <div className="card-buttons">
                <button
                  className="action-btn btn-edit"
                  onClick={() => handleEdit(tea, i)}
                >
                  Edit
                </button>
                <button
                  className="action-btn btn-fees"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
