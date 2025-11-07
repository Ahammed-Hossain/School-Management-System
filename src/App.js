import React from "react";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Fees from "./Components/Fees";
import AddStudents from "./Components/Addstudents";
import StudentsInfo from "./Components/StudentsInfo";
import AddTeachers from "./Components/Addteachers";
import TeachersInfo from "./Components/TeachersInfo";

function App() {


  const allrouters = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: 'addstudents', element: <AddStudents /> },
    { path: 'studentsInfo', element: <StudentsInfo /> },
    { path: 'addteachers', element: <AddTeachers /> },
    { path: 'teachersInfo', element: <TeachersInfo /> },
    { path: 'fees', element: <Fees /> }
  ]);


  return (
    <div className="App">
      <RouterProvider router={allrouters} />
    </div>
  );
}

export default App;
