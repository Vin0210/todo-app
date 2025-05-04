export default function TodoStats({ todos }) {
  return (
    <div style={{
      marginTop: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '1rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderLeft: '1px solid #e5e7eb',
        '& > div': {
          borderRight: '1px solid #e5e7eb'
        }
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total</p>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
            {todos.length}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Active</p>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#4f46e5' }}>
            {todos.filter(t => !t.completed).length}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Completed</p>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#16a34a' }}>
            {todos.filter(t => t.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
}