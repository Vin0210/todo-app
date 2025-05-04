import { useState, useEffect } from 'react';
import { Check, PlusCircle, X } from 'lucide-react';

export default function TodoForm({ currentTodo, editMode, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editMode && currentTodo) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
      setPriority(currentTodo.priority);
      setDueDate(currentTodo.dueDate);
    }
  }, [editMode, currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: editMode ? currentTodo.id : Date.now(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
    };
    onSubmit(newTodo);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
          {editMode ? 'Edit Task' : 'Add New Task'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          style={{
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
              }}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                minHeight: '6rem',
              }}
              rows="3"
            ></textarea>
          </div>
          
          <div style={{
            display: 'grid',
            gap: '1rem',
            '@media (min-width: 768px)': {
              gridTemplateColumns: '1fr 1fr'
            }
          }}>
            <div>
              <label htmlFor="priority" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dueDate" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                color: '#374151',
                borderRadius: '0.375rem',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {editMode ? (
                <>
                  <Check size={18} />
                  Update Task
                </>
              ) : (
                <>
                  <PlusCircle size={18} />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
