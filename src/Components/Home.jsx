/* Home.js */
import React from "react";
import Header from "./Header";
import "./All.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="homeContainer">
        <Header />
      </div>
      <div className="bntMain-container">
        <div className="homeBtns">
          <Link className="btn" to={"/addstudents"}>
            Add Students Info
          </Link>
          <Link className="btn" to={"/studentsInfo"}>
            Students Info
          </Link>
          <Link className="btn" to={"/addteachers"}>
            Add Teachers Info
          </Link>
          <Link className="btn" to={"/teachersInfo"}>
            Teachers Info
          </Link>
          <Link className="btn" to={"/fees"}>
            Students Fees
          </Link>
        </div>
      </div>
    </div>
  );
}
