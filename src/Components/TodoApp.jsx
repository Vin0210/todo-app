import { useState, useEffect } from 'react';
import Header from './Header';
import TodoControls from './TodoControls';
import AddTaskButton from './AddTaskButton'; 
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import Footer from './Footer';

// Mock data for initial todos
const initialTodos = [
  { id: 1, title: "Complete React project", description: "Finish the CRUD Todo application", completed: false, priority: "high", dueDate: "2025-05-10" },
  { id: 2, title: "Learn TypeScript", description: "Study TypeScript fundamentals for 2 hours", completed: true, priority: "medium", dueDate: "2025-05-07" },
  { id: 3, title: "Go grocery shopping", description: "Buy fruits, vegetables, and milk", completed: false, priority: "low", dueDate: "2025-05-06" },
];

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API delay
      setTimeout(() => {
        setTodos(initialTodos);
        setIsLoading(false);
      }, 800);
    };
    fetchData();
  }, []);

  // Filter todos based on status and search term
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      (filter === 'all') || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Add new todo
  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
    setFormVisible(false);
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Set todo for editing
  const editTodo = (todo) => {
    setCurrentTodo(todo);
    setEditMode(true);
    setFormVisible(true);
  };

  // Update existing todo
  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setEditMode(false);
    setCurrentTodo(null);
    setFormVisible(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)', padding: '1rem' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <Header />
        
        <TodoControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />
        
        {!formVisible && (
          <AddTaskButton setFormVisible={setFormVisible} />
        )}
        
        {formVisible && (
          <TodoForm
            currentTodo={currentTodo}
            editMode={editMode}
            onSubmit={editMode ? updateTodo : addTodo}
            onCancel={resetForm}
          />
        )}
        
        <TodoList
          todos={filteredTodos}
          isLoading={isLoading}
          onToggleComplete={toggleComplete}
          onEdit={editTodo}
          onDelete={deleteTodo}
          searchTerm={searchTerm}
          filter={filter}
          setFormVisible={setFormVisible}
        />
        
        {todos.length > 0 && (
          <TodoStats todos={todos} />
        )}
        
        <Footer />
      </div>
    </div>
  );
}
