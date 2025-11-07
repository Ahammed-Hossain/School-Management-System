import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import "./Fees.css";

export default function Fees() {
  const [searchID, setSearchID] = useState("");
  const [student, setStudent] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [paidMonths, setPaidMonths] = useState({});
  const location = useLocation();

  // StudentsInfo থেকে student এসেছে কিনা চেক
  useEffect(() => {
    if (location.state?.student) {
      const s = location.state.student;
      setStudent(s);
      // localStorage থেকে Fees data load
      const saved = JSON.parse(localStorage.getItem(`fees_${s.sId}`)) || {};
      setPaidMonths(saved);
    }
  }, [location.state]);

  // LocalStorage থেকে সব students load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setAllStudents(stored);
  }, []);

  // 🔍 Search
  const handleSearch = () => {
    const found = allStudents.find(
      (stu) => stu.sId.toString() === searchID.trim()
    );
    if (found) {
      setStudent(found);
      const saved = JSON.parse(localStorage.getItem(`fees_${found.sId}`)) || {};
      setPaidMonths(saved);
    } else {
      setStudent(null);
      setPaidMonths({});
    }
  };

  // 💰 Pay button click
  const handlePay = (month) => {
    if (!student) return;
    const updated = { ...paidMonths, [month]: true };
    setPaidMonths(updated);

    // Fees page localStorage এ save
    localStorage.setItem(`fees_${student.sId}`, JSON.stringify(updated));

    // Optional: StudentsInfo page এর student object update (if needed)
    const updatedStudent = { ...student, paidMonths: updated };
    const updatedAll = allStudents.map((stu) =>
      stu.sId === student.sId ? updatedStudent : stu
    );
    setAllStudents(updatedAll);
    localStorage.setItem("students", JSON.stringify(updatedAll));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <Header />
      <div className="ul">
        <ul>
          <li className="linkHome"><Link to={"/"}>Home</Link></li>
          <li className="linkHome"><Link to={"/addstudents"}>Add Student Info</Link></li>
          <li className="linkHome"><Link to={"/teachersInfo"}>Teachers Info</Link></li>
          <li className="linkHome"><Link to={"/studentsInfo"}>Students Info</Link></li>
          <li className="linkHome"><Link to={"/addteachers"}>Add Teachers Info</Link></li>
        </ul>
      </div>

        <p className="secTitle">Student Fees</p>

      {/* Search Box */}
      <div className="searchContainer">
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search by Student ID"
            className="searchInput"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
          <button className="searchBtn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <h3 className="fees-studentName">
        {student ? student.sName : "No student selected"}
      </h3>

      {/* Fees Table */}
      {student && (
        <div className="table-container-fees">
          <table className="fees-table">
            <thead>
              <tr>
                <th>Months</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => (
                <tr key={month} className={paidMonths[month] ? "paid-row" : ""}>
                  <td>{month}</td>
                  <td>100</td>
                  <td>
                    <button
                      className={`action-btn ${paidMonths[month] ? "btn-paid" : "btn-edit"}`}
                      onClick={() => handlePay(month)}
                      disabled={paidMonths[month]}
                    >
                      {paidMonths[month] ? "Paid" : "Pay"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}