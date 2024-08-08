import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext';
import './NavBar.css';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Yu-Gi-Oh! Deck Builder</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/deck-builder">Deck Builder</Link></li>
        <li><Link to="/community-hub">Community Hub</Link></li>
        {user ? (
          <>
            <li>Welcome, {user.username}</li> 
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

