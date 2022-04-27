import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header({ search, title }) {
  const [searchIsTrue, setSearchIsTrue] = useState(false);

  return (
    <header>
      <Link to="/profile">
        <button
          type="button"
          onClick={ (props) => console.log(props) }
        >
          <img data-testid="profile-top-btn" alt="profileIcon" src={ profileIcon } />
        </button>
      </Link>
      <div data-testid="page-title">{title}</div>
      {!search && (
        <button
          type="button"
          onClick={ () => (
            searchIsTrue ? setSearchIsTrue(false) : setSearchIsTrue(true)) }
        >
          <img data-testid="search-top-btn" alt="searchIcon" src={ searchIcon } />
        </button>
      )}
      {searchIsTrue && (
        <Search />
      )}
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
