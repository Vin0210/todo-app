// src/components/Header.jsx
export default function Header() {
  return (
    <header style={{
      textAlign: 'center',
      marginBottom: '2rem'
    }}>
      <h1 style={{
        fontSize: '1.875rem', // text-3xl
        fontWeight: '700', // font-bold
        color: '#4338ca', // indigo-700
        marginBottom: '0.5rem',
        '@media (min-width: 768px)': { // md: breakpoint
          fontSize: '2.25rem' // md:text-4xl
        }
      }}>
        Task Manager
      </h1>
      <p style={{
        color: '#4b5563' // gray-600
      }}>
        Stay organized and productive
      </p>
    </header>
  );
}