export default function TodoControls({ searchTerm, setSearchTerm, filter, setFilter }) {
  return (
    <div style={{
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <div style={{
        width: '100%',
        position: 'relative',
      }}>
        <input
          type="text"
          placeholder="Search tasks..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            paddingRight: '2.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: 'none',
            outline: 'none',
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{
          position: 'absolute',
          right: '0.75rem',
          top: '0.75rem',
          color: '#9ca3af'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{
            height: '1.5rem',
            width: '1.5rem'
          }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
      }}>
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: '500',
              backgroundColor: filter === filterType ? '#4f46e5' : 'white',
              color: filter === filterType ? 'white' : '#374151',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s',
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
