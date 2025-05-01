import React, { useState } from "react";
import "../App.css"; 

function Create() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [date, setDate] = useState("");

  const handleAddTask = () => {
    if (!task || !date) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = { 
      id: Date.now(), 
      task, 
      category, 
      date, 
      completed: false 
    };

    existingTasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    alert("✅ Task added successfully!");
 
    setTask("");
    setDate("");
    setCategory("Work");
  };

  return (
    <div className="create-container">
      <h2>Create a New Task</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Task Name</label>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter task" 
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Wishlist">Wishlist</option>
          <option value="Birthday">Birthday</option>
          <option value="New">+ Create New</option>
        </select>

        <label>Due Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />

        <button type="button" onClick={handleAddTask}>Add Task</button>
      </form>
    </div>
  );
}

export default Create;
