import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Yu-Gi-Oh! Deck Builder</h1>
        <p>Your ultimate tool for building and sharing Yu-Gi-Oh! decks.</p>
      </header>
      <main className="home-main">
        <section className="home-feature">
          <h2>Build Your Deck</h2>
          <p>Search for cards and build your perfect deck with our easy-to-use interface.</p>
          <Link to="/deck-builder" className="home-button">Start Building</Link>
        </section>
        <section className="home-feature">
          <h2>Manage Your Decks</h2>
          <p>Keep track of all your decks in one place. Edit and refine them anytime.</p>
          <Link to="/dashboard" className="home-button">View Dashboard</Link>
        </section>
        <section className="home-feature">
          <h2>Join the Community</h2>
          <p>Browse and rate decks and combos shared by other users.</p>
          <Link to="/community-hub" className="home-button">Explore Community</Link>
        </section>
      </main>
      <footer className="home-footer">
        <Link to="/login" className="home-button">Log In</Link>
        <br></br>
        <Link to="/signup" className="home-button">Sign Up</Link>
      </footer>
    </div>
  );
}

export default HomePage;
