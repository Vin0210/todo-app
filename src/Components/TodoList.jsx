import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

export default function TodoList({ 
  todos, 
  isLoading, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  searchTerm, 
  filter,
  setFormVisible 
}) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {isLoading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5rem 0'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #c7d2fe',
            borderTop: '4px solid #7c3aed',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      ) : todos.length ? (
        todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <EmptyState 
          searchTerm={searchTerm}
          filter={filter}
          setFormVisible={setFormVisible}
        />
      )}
    </div>
  );
}

// Add this to your global CSS:
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }