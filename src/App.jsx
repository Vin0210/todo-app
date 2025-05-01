import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav"; 
import Home from "./components/home";
import Create from "./components/create"; 
import Mine from "./components/mine";
import Task from "./components/task";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/mine" element={<Mine />} />
       
            <Route path="/task" element={<Task />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
