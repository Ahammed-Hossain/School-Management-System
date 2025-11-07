import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./StudentsInfo.css";
import "./All.css";

export default function AddStudents() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    sId: "",
    sName: "",
    sFatherName: "",
    sMotherName: "",
    sRollNo: "",
    sAddress: "",
    sContact: "",
  });

  const [addData, setAddData] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (
      location.state &&
      location.state.student &&
      location.state.index !== undefined
    ) {
      setFormData(location.state.student);
      setEditIndex(location.state.index);
    }
  }, [location.state]);

  const getData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedData = [...addData];

    const duplicate = updatedData.some(
      (student, index) => student.sId === formData.sId && index !== editIndex
    );

    if (duplicate) {
      alert("This ID already exists!");
      return;
    }

    if (editIndex !== null) {
      // Edit mode: update existing student
      updatedData[editIndex] = formData;
    } else {
      // Add new student
      updatedData.push(formData);
    }

    setAddData(updatedData);
    localStorage.setItem("students", JSON.stringify(updatedData));

    // Clear form and reset editIndex
    setFormData({
      sId: "",
      sName: "",
      sFatherName: "",
      sMotherName: "",
      sRollNo: "",
      sAddress: "",
      sContact: "",
    });
    setEditIndex(null);
    navigate("/studentsInfo"); // Redirect back to StudentsInfo page
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
            <Link to={"/addteachers"}>Add Teachers Info</Link>
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

      <p className="secTitle">Add Students Info</p>

      <div className="form-Container">
        <form className="form-list" onSubmit={handleSubmit}>
          <label>Student Id</label>
          <input
            type="number"
            name="sId"
            value={formData.sId}
            onChange={getData}
            required
          />

          <label>Student Name</label>
          <input
            type="text"
            name="sName"
            value={formData.sName}
            onChange={getData}
            required
          />

          <label>Father's Name</label>
          <input
            type="text"
            name="sFatherName"
            value={formData.sFatherName}
            onChange={getData}
            required
          />

          <label>Mother's Name</label>
          <input
            type="text"
            name="sMotherName"
            value={formData.sMotherName}
            onChange={getData}
            required
          />

          <label>Roll No.</label>
          <input
            type="number"
            name="sRollNo"
            value={formData.sRollNo}
            onChange={getData}
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="sAddress"
            value={formData.sAddress}
            onChange={getData}
          />

          <label>Contact Info</label>
          <input
            type="number"
            name="sContact"
            value={formData.sContact}
            onChange={getData}
          />

          <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
        </form>
      </div>
    </div>
  );
}
