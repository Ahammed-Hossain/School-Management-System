import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./StudentsInfo.css";
import "./All.css";

export default function StudentsInfo() {
  const [students, setStudents] = useState([]);
  const [searchID, setSearchID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, []);

  const handleEdit = (student, index) => {
    navigate("/addstudents", { state: { student, index } });
  };

  const filteredStudents = searchID
    ? students.filter((stu) => stu.sId.toString() === searchID)
    : students;

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  let handleClick = (student) => {
    navigate("/fees", { state: { student } });
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
            <Link to={"/teachersInfo"}>Teachers Info</Link>
          </li>
          <li className="linkHome">
            <Link to={"/addteachers"}>Add Teachers Info</Link>
          </li>
          <li className="linkHome">
            <Link to={"/fees"}>Students Fees</Link>
          </li>
        </ul>

        <p className="secTitle">Student Info</p>

        <div className="searchContainer">
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search by Student ID"
              className="searchInput"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
            />
            <button className="searchBtn" onClick={() => setSearchID("")}>
              Search
            </button>
          </div>
        </div>

        <div className="table-container">
          {filteredStudents.map((stu, i) => (
            <div key={i} className="student-card">
              <h3>{stu.sName}</h3>
              <p>
                <strong>ID:</strong> <span>{stu.sId}</span>
              </p>
              <p>
                <strong>Father:</strong> <span>{stu.sFatherName}</span>
              </p>
              <p>
                <strong>Mother:</strong> <span>{stu.sMotherName}</span>
              </p>
              <p>
                <strong>Roll No:</strong> <span>{stu.sRollNo}</span>
              </p>
              <p>
                <strong>Address:</strong> <span>{stu.sAddress}</span>
              </p>
              <p>
                <strong>Contact:</strong> <span>{stu.sContact}</span>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                <button
                  className="action-btn btn-edit"
                  onClick={() => handleEdit(stu, i)}
                >
                  Edit
                </button>
                <button
                  className="action-btn btn-fees"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
                <button
                  className="action-btn btn-edit"
                  onClick={() => handleClick(stu)}
                >
                  Pay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
