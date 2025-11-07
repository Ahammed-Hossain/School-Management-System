import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "./TeachersInfo.css";
import "./All.css";

export default function TeachersInfo() {
  const [teachers, setTeachers] = useState([]);
  const [searchId, setSearchId] = useState('')
  const navigate = useNavigate();

  // Load teachers from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teachers")) || [];
    setTeachers(data);
  }, []);

  const handleEdit = (teacher, index) => {
    navigate("/addteachers", { state: { teacher, index } });
  };

  const filterTeachers = searchId
  ? teachers.filter((tea) => tea.tID.toString() === searchId)
  : teachers;

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
            <button className="searchBtn" onClick={() => setSearchId("")}>Search</button>
          </div>
        </div>

        <div className="table-container">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Edit Info</th>
              </tr>
            </thead>
            <tbody>
              {filterTeachers.map((tea, i) => (
                <tr key={i}>
                  <td>{tea.tID}</td>
                  <td>{tea.tName}</td>
                  <td>{tea.Subject}</td>
                  <td>{tea.Address}</td>
                  <td>{tea.Contact}</td>
                  <td>
                    <button
                      className="action-btn btn-edit"
                      onClick={() => handleEdit(tea, i)}
                    >
                      Edit
                    </button>
                    <DeleteLists
                      indexNumber={i}
                      teachers={teachers}
                      setTeachers={setTeachers}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DeleteLists({ indexNumber, teachers, setTeachers }) {
  let DeleteRow = () => {
    let finalList = teachers.filter((v, i) => i !== indexNumber);
    setTeachers(finalList);
  };
  return (
    <button className="action-btn btn-fees" onClick={DeleteRow}>
      Delete
    </button>
  );
}