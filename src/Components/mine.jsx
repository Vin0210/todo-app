import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaCheckCircle, FaTasks, FaCalendarAlt, FaListUl, FaChartLine } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ['#EF9273', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0'];

const Mine = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
      setTasks([...storedTasks, ...completedTasks]);

      const storedCategories = JSON.parse(localStorage.getItem("categories")) || [
        "Work", "Personal", "Wishlist", "Birthday"
      ];
      setCategories(storedCategories);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  const dailyCompletionData = tasks.reduce((acc, task) => {
    if (task.completed) {
      const date = task.date;
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(dailyCompletionData).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    tasks: count,
  }));

  const categoryData = categories.map(category => ({
    name: category,
    value: tasks.filter(task => task.category === category).length
  })).filter(item => item.value > 0);

  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const pendingByCategory = categories.reduce((acc, category) => {
    acc[category] = tasks.filter(task => task.category === category && !task.completed).length;
    return acc;
  }, {});

  const productivityScore = tasks.length > 0 
    ? Math.round((completedTasksCount / tasks.length) * 100)
    : 0;

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="dashboard-title">
        <FaChartLine className="title-icon" /> Task Overview Dashboard
      </h2>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="stats-container">
            <motion.div 
              className="stat-card completed"
              whileHover={{ scale: 1.03 }}
            >
              <FaCheckCircle className="stat-icon" />
              <div className="stat-content">
                <h3>Completed Tasks</h3>
                <p className="stat-value">{completedTasksCount}</p>
                <p className="stat-change">{productivityScore}% Productivity</p>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card pending"
              whileHover={{ scale: 1.03 }}
            >
              <FaTasks className="stat-icon" />
              <div className="stat-content">
                <h3>Pending Tasks</h3>
                <p className="stat-value">{pendingTasksCount}</p>
                <p className="stat-change">
                  {tasks.length > 0 ? Math.round((pendingTasksCount / tasks.length) * 100) : 0}% of total
                </p>
              </div>
            </motion.div>
          </div>

          <div className="chart-section">
            <h3 className="section-title">
              <FaCalendarAlt className="section-icon" /> Daily Completion
            </h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="tasks" 
                    fill="#EF9273" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="tasks-grid">
            <div className="upcoming-tasks">
              <h3 className="section-title">
                <FaCalendarAlt className="section-icon" /> Upcoming Tasks
              </h3>
              <ul className="task-list">
                {upcomingTasks.length > 0 ? (
                  upcomingTasks.map((task) => (
                    <motion.li 
                      key={task.id} 
                      className="task-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="task-name">{task.task}</span>
                      <span className="task-date">
                        {new Date(task.date).toLocaleDateString("en-US", {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className={`task-category ${task.category.toLowerCase()}`}>
                        {task.category}
                      </span>
                    </motion.li>
                  ))
                ) : (
                  <p className="no-tasks">No upcoming tasks</p>
                )}
              </ul>
            </div>

            <div className="pending-categories">
              <h3 className="section-title">
                <FaListUl className="section-icon" /> Pending by Category
              </h3>
              <ul className="category-list">
                {Object.entries(pendingByCategory).map(([category, count]) => (
                  count > 0 && (
                    <motion.li 
                      key={category} 
                      className="category-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="category-name">{category}</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${(count / pendingTasksCount) * 100}%`,
                            backgroundColor: COLORS[categories.indexOf(category) % COLORS.length]
                          }}
                        ></div>
                        <span className="task-count">{count}</span>
                      </div>
                    </motion.li>
                  )
                ))}
                {Object.values(pendingByCategory).every(count => count === 0) && (
                  <p className="no-tasks">No pending tasks</p>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Mine;