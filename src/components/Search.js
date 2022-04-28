import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callApiDrinks, callApiFoods } from '../redux/action/actionsAsysc';

export default function Search({ title }) {
  const [radioValue, setRadioValue] = useState('');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  function handleClick() {
    if (radioValue === 'letter' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return title === 'Foods'
      ? dispatch(callApiFoods(search, radioValue))
      : dispatch(callApiDrinks(search, radioValue));
  }

  return (
    <form>
      <input
        placeholder="search recipe"
        data-testid="search-input"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <label htmlFor="ingredient">
        Ingredient:
        <input
          id="ingredient"
          type="radio"
          value="ingredients"
          onChange={ ({ target }) => setRadioValue(target.value) }
          name="search"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search">
        Name:
        <input
          id="name-search"
          type="radio"
          value="name"
          onChange={ ({ target }) => setRadioValue(target.value) }
          name="search"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        First Letter:
        <input
          id="first-letter"
          type="radio"
          value="letter"
          onChange={ ({ target }) => setRadioValue(target.value) }
          name="search"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </form>
  );
}

Search.propTypes = {
  title: PropTypes.string.isRequired,
};
