import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash, FaPlus, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "../App.css";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [
      "Work",
      "Personal",
      "Wishlist",
      "Birthday",
    ];
    setCategories(storedCategories);
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);

    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      completedTask.completed = true;
      const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
      localStorage.setItem("completedTasks", JSON.stringify([...completedTasks, completedTask]));
      showNotification("Task marked as complete!", "success");
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      saveTasks(updatedTasks);
      showNotification("Task deleted successfully!", "success");
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    const newTaskName = prompt("Edit task name:", taskToEdit.task);
    if (newTaskName && newTaskName.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, task: newTaskName.trim() } : task
      );
      saveTasks(updatedTasks);
      showNotification("Task updated successfully!", "success");
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      showNotification("Task cannot be empty!", "error");
      return;
    }

    const taskObj = {
      id: Date.now(),
      task: newTask.trim(),
      category: newCategory,
      completed: false,
      date: new Date().toISOString().split("T")[0],
    };

    saveTasks([...tasks, taskObj]);
    setNewTask("");
    setShowAddForm(false);
    showNotification("Task added successfully!", "success");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filterCategory === "All" || task.category === filterCategory) &&
      task.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="task-container">
      <div className="task-header">
        <div className="header-left">
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h2>Task Manager</h2>
        </div>
        <button 
          className="add-task-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FaPlus /> {showAddForm ? "Cancel" : "Add Task"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTask} className="add-task-form">
          <div className="form-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
              autoFocus
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">
              <FaPlus /> Add
            </button>
          </div>
        </form>
      )}

      <div className={`task-filters ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-filter"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="task-table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th className="category-column">Category</th>
              <th className="date-column">Date</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr className="no-tasks">
                <td colSpan="4">
                  {search || filterCategory !== "All" 
                    ? "No matching tasks found" 
                    : "No tasks available. Add a new task!"}
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="task-name">{task.task}</td>
                  <td className="category-column">
                    <span className={`category-tag ${task.category.toLowerCase()}`}>
                      {task.category}
                    </span>
                  </td>
                  <td className="date-column">{new Date(task.date).toLocaleDateString()}</td>
                  <td className="actions actions-column">
                    <button 
                      onClick={() => toggleComplete(task.id)}
                      className="icon-btn complete"
                      title="Mark as Complete"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => editTask(task.id)}
                      className="icon-btn edit"
                      title="Edit Task"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="icon-btn delete"
                      title="Delete Task"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default Task;