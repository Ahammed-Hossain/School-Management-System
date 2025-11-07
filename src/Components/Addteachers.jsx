import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./StudentsInfo.css";
import "./All.css";

export default function AddTeachers() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    tID: "",
    tName: "",
    Subject: "",
    Address: "",
    Contact: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const [listData, setListData] = useState(
    JSON.parse(localStorage.getItem("teachers")) || []
  );

  // Load teacher data if coming from edit
  useEffect(() => {
    if (
      location.state &&
      location.state.teacher &&
      location.state.index !== undefined
    ) {
      setFormData(location.state.teacher);
      setEditIndex(location.state.index);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedData = [...listData];

    // Duplicate ID check
    const duplicate = updatedData.some(
      (teacher, index) => teacher.tID === formData.tID && index !== editIndex
    );

    if (duplicate) {
      alert("This ID already exists!");
      return;
    }

    if (editIndex !== null) {
      // Update existing teacher
      updatedData[editIndex] = formData;
    } else {
      // Add new teacher
      updatedData.push(formData);
    }

    setListData(updatedData);
    localStorage.setItem("teachers", JSON.stringify(updatedData));

    // Clear form
    setFormData({
      tID: "",
      tName: "",
      Subject: "",
      Address: "",
      Contact: "",
    });
    setEditIndex(null);

    navigate("/teachersInfo"); // redirect to teachers info page
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
            <Link to={"/teachersInfo"}>Teachers Info</Link>
          </li>
          <li className="linkHome">
            <Link to={"/fees"}>Students Fees</Link>
          </li>
        </ul>
      </div>

      <p className="secTitle">{editIndex !== null ? "Edit Teachers Info" : "Add Teachers Info"}</p>

      <div className="form-Container">
        <form className="form-list" onSubmit={handleSubmit}>
          <label>Teachers Id</label>
          <input
            type="number"
            name="tID"
            onChange={handleChange}
            value={formData.tID}
            required
          />

          <label>Teachers Name</label>
          <input
            type="text"
            name="tName"
            onChange={handleChange}
            value={formData.tName}
            required
          />

          <label>Subject</label>
          <input
            type="text"
            name="Subject"
            onChange={handleChange}
            value={formData.Subject}
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="Address"
            onChange={handleChange}
            value={formData.Address}
          />

          <label>Contact Info</label>
          <input
            type="number"
            name="Contact"
            onChange={handleChange}
            value={formData.Contact}
          />

          <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
        </form>
      </div>
    </div>
  );
}
