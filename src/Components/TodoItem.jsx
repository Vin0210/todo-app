import { CheckCircle, Calendar, Edit, Trash2 } from 'lucide-react';

export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#ef4444', color: 'white' }; // red-500
      case 'medium': return { backgroundColor: '#eab308', color: 'white' }; // yellow-500
      case 'low': return { backgroundColor: '#22c55e', color: 'white' }; // green-500
      default: return { backgroundColor: '#6b7280', color: 'white' }; // gray-500
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Check if due date is passed
  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    return dueDate < today && dueDate.toDateString() !== today.toDateString();
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      opacity: todo.completed ? 0.75 : 1
    }}>
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <button
              onClick={() => onToggleComplete(todo.id)}
              style={{
                marginTop: '0.25rem',
                flexShrink: 0,
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
                border: `2px solid ${todo.completed ? '#6366f1' : '#d1d5db'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: todo.completed ? '#6366f1' : 'transparent',
                color: todo.completed ? 'white' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s, border-color 0.2s',
                ':hover': {
                  borderColor: todo.completed ? '#6366f1' : '#818cf8'
                }
              }}
            >
              {todo.completed && <CheckCircle size={14} />}
            </button>
            
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: todo.completed ? '#6b7280' : '#1f2937',
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <p style={{
                  marginTop: '0.25rem',
                  fontSize: '0.875rem',
                  color: todo.completed ? '#9ca3af' : '#4b5563'
                }}>
                  {todo.description}
                </p>
              )}
              
              <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  ...getPriorityColor(todo.priority)
                }}>
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                </span>
                
                {todo.dueDate && (
                  <span style={{
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: isOverdue(todo.dueDate) && !todo.completed ? '#dc2626' : '#6b7280'
                  }}>
                    <Calendar size={12} />
                    {formatDate(todo.dueDate)}
                    {isOverdue(todo.dueDate) && !todo.completed && ' (Overdue)'}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onEdit(todo)}
              style={{
                padding: '0.375rem',
                color: '#6b7280',
                borderRadius: '0.375rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                  color: '#4f46e5',
                  backgroundColor: '#e0e7ff'
                }
              }}
              aria-label="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              style={{
                padding: '0.375rem',
                color: '#6b7280',
                borderRadius: '0.375rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                  color: '#dc2626',
                  backgroundColor: '#fee2e2'
                }
              }}
              aria-label="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}