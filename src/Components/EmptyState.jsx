// src/components/EmptyState.jsx
export default function EmptyState({ searchTerm, filter, setFormVisible }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '4rem',
          height: '4rem',
          backgroundColor: '#e0e7ff', // indigo-100
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            color: '#6366f1', // indigo-500
            fontSize: '1.5rem'
          }}>📝</span>
        </div>
      </div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '500',
        color: '#1f2937', // gray-800
        marginBottom: '0.5rem'
      }}>No tasks found</h3>
      <p style={{ color: '#4b5563' }}> {/* gray-600 */}
        {searchTerm 
          ? "No tasks match your search criteria" 
          : filter === 'completed' 
            ? "You haven't completed any tasks yet" 
            : filter === 'active' 
              ? "You don't have any active tasks" 
              : "Start adding tasks to stay organized"}
      </p>
      <button
        onClick={() => setFormVisible(true)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#4f46e5', // indigo-600
          color: 'white',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'} // indigo-700
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'} // indigo-600
      >
        Add Your First Task
      </button>
    </div>
  );
}