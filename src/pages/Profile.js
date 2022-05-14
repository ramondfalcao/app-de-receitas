/* eslint-disable react/jsx-max-depth */
// import md5 from 'crypto-js/md5';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import logoutIcon from '../images/logoutIcon.svg';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState('');
  //  const [hash, setHash] = useState('');

  useEffect(() => {
    const emailUser = JSON.parse(localStorage.getItem('user'));
    if (emailUser) {
    //  setHash(md5(emailUser).toString());
      setUser(emailUser);
    }
  }, []);

  return (
    <>
      <Header title="Profile" search={ false } />
      <main className="main-Profile">
        <img className="img-profile" src={ `https://www.gravatar.com/avatar/${user.email}` } alt={ user.email } />
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
              <img className="logoutIcon" alt="logoutIcon" src={ logoutIcon } />
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
