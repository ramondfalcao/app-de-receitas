import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import homeIcon from '../images/homeIcon.svg';
import Search from './Search';
import './Header.css';

function Header({ search, title }) {
  const [searchIsTrue, setSearchIsTrue] = useState(false);
  const history = useHistory();

  return (
    <>
      <header className="header">
        <Link to="/profile">
          <button
            type="button"
            className="profile-btn"
            onClick={ (props) => console.log(props) }
          >
            <img data-testid="profile-top-btn" alt="profileIcon" src={ profileIcon } />
          </button>
        </Link>
        <div className="title-header" data-testid="page-title">{title}</div>
        <div>
          {search
            ? (
              <button
                type="button"
                className="search-btn"
                onClick={ () => (
                  searchIsTrue ? setSearchIsTrue(false) : setSearchIsTrue(true)) }
              >
                <img data-testid="search-top-btn" alt="searchIcon" src={ searchIcon } />
              </button>
            )
            : (
              <button
                type="button"
                className="search-btn"
                onClick={ () => history.push('/foods') }
              >
                <img className="home-btn" alt="houseIcon" src={ homeIcon } />
              </button>
            )}
        </div>
      </header>
      {searchIsTrue && (
        <Search title={ title } />
      )}
    </>
  );
}

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
