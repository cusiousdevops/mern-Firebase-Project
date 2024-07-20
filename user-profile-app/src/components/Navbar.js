
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = (user) => {
  console.log('User :: ',user);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h1>MyApp</h1>
      </div>
      <div style={styles.menu}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <span style={styles.strong}>{user ? `Hello, ${user.user.data.name}` : 'Login'}</span>

      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
  },
  menu: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  buttonActive: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  buttonDisabled: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: '#fff',
    cursor: 'not-allowed',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  strong: {
    fontSize: '20px',
    color: 'red',
  }
};

export default Navbar;
