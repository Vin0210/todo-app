import React, { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt, FaTag, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

function Create() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [date, setDate] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
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
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!task.trim()) {
      showNotification("Please enter a task name", "error");
      return;
    }

    if (!date) {
      showNotification("Please select a due date", "error");
      return;
    }

    if (category === "New" && !customCategory.trim()) {
      showNotification("Please enter a new category name", "error");
      return;
    }

    const finalCategory = category === "New" ? customCategory.trim() : category;

    // Add new category if it doesn't exist
    if (category === "New" && !categories.includes(finalCategory)) {
      const updatedCategories = [...categories, finalCategory];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = { 
      id: Date.now(), 
      task: task.trim(), 
      category: finalCategory, 
      date, 
      completed: false,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));
    showNotification("Task added successfully!", "success");

    // Reset form
    setTask("");
    setDate("");
    setCategory("Work");
    setCustomCategory("");
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div 
      className="create-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="create-title">Create New Task</h2>
      
      <form onSubmit={handleAddTask} className="task-form">
        <div className="form-group">
          <label htmlFor="task-input" className="form-label">
            Task Name
          </label>
          <div className="input-with-icon">
            <FaCheck className="input-icon" />
            <input
              id="task-input"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task description"
              className="form-input"
              autoFocus
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category-select" className="form-label">
            Category
          </label>
          <div className="input-with-icon">
            <FaTag className="input-icon" />
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="New">+ Create New Category</option>
            </select>
          </div>

          {category === "New" && (
            <div className="input-with-icon">
              <FaPlus className="input-icon" />
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter new category name"
                className="form-input"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date-input" className="form-label">
            Due Date
          </label>
          <div className="input-with-icon">
            <FaCalendarAlt className="input-icon" />
            <input
              id="date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              className="form-input"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus /> Add Task
        </motion.button>
      </form>

      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Create;