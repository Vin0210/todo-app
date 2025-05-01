import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaTasks, FaCalendarAlt } from "react-icons/fa";
import "../App.css";

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <h1 className="logo">TaskFlow</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/mine" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/create" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <FaPlusCircle className="nav-icon" />
            <span>Create Task</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/task" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <FaTasks className="nav-icon" />
            <span>Task List</span>
          </NavLink>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;