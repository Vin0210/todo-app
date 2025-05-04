// src/components/AddTaskButton.jsx
import { PlusCircle } from 'lucide-react';

export default function AddTaskButton({ setFormVisible }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
      <button
        onClick={() => setFormVisible(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4f46e5', // indigo-600
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'} // indigo-700
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'} // indigo-600
      >
        <PlusCircle size={20} />
        <span>Add New Task</span>
      </button>
    </div>
  );
}