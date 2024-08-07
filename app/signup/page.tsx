// pages/signup.tsx
"use client"
import React from 'react';
import { signIn } from 'next-auth/react';

const Signup = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  };

  const headerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#0070f3',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    position: 'fixed',
    top: 0,
  };

  const formContainerStyle: React.CSSProperties = {
    marginTop: '5rem',
    padding: '2rem',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    textAlign: 'center',
    margin: '0.5rem 0',
  };

  const googleButtonStyle: React.CSSProperties = {
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    textAlign: 'center',
    marginTop: '1rem',
  };

  const linkStyle: React.CSSProperties = {
    color: '#0070f3',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
          <span role="img" aria-label="icon">📅</span>
          <div>
            <button style={{ ...buttonStyle, width: 'auto', margin: '0 0.5rem' }}>Login</button>
            <button style={{ ...buttonStyle, width: 'auto', margin: '0 0.5rem' }}>Signup</button>
          </div>
        </div>
      </header>
      <div style={formContainerStyle}>
        <h1 style={{ color: '#0070f3' }}>Signup</h1>
        <input type="text" placeholder="First Name" style={inputStyle} />
        <input type="text" placeholder="Last Name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <input type="password" placeholder="Confirm Password" style={inputStyle} />
        <button style={buttonStyle}>Signup</button>
        <p>
          Already have an account? <span style={linkStyle}>Login</span>
        </p>
        <button onClick={() => signIn('google')} style={googleButtonStyle}>
          Signup with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
