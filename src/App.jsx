import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Home from "./Components/home";
import Create from "./Components/create"; 
import Mine from "./Components/mine";
import Task from "./Components/task";

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
