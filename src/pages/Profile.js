import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const emailUser = JSON.parse(localStorage.getItem('user'));
    if (emailUser) {
      setUser(emailUser);
    }
  }, []);

  return (
    <div>
      <Header title="Profile" search={ false } />
      <main className="main-Profile">
        <p data-testid="profile-email">{ user.email }</p>
        <section className="section-buttons">

          <Link to="/done-recipes">
            <button
              className="buttons"
              type="button"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              className="buttons"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              className="buttons"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Logout
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
