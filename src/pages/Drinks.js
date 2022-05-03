import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardDrinks from '../components/CardDrinks';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { callApiDrinks } from '../redux/action/actionsAsysc';

export default function Drinks(props) {
  const { history } = props;
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const [filter, setFilter] = useState('');

  function renderDrinks() {
    if (drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
    return <CardDrinks />;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callApiDrinks('', 'all'));
    dispatch(callApiDrinks('', 'categories'));
  }, []);

  const categories = useSelector((state) => state.drinksReducer.categories);
  const MAXIMUM_ARRAY_SIZE = 5;
  let buttonsCategories = [];
  if (categories !== undefined) {
    buttonsCategories = categories.slice(0, MAXIMUM_ARRAY_SIZE);
  }

  const requestFilter = async ({ target }) => {
    const { name } = target;
    if (filter === '') {
      dispatch(callApiDrinks(name, 'filter'));
      setFilter(name);
    }
    if (name !== filter) {
      dispatch(callApiDrinks(name, 'filter'));
      setFilter(name);
    }
    if (filter === name) {
      dispatch(callApiDrinks('', 'all'));
    }
  };

  const allRecipes = () => {
    dispatch(callApiDrinks('', 'all'));
  };

  return (
    (dispatch(callApiDrinks('', 'categories'))),
    (
      <div>
        <Header title="Drinks" search />
        { buttonsCategories && buttonsCategories.map((category, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ requestFilter }
            name={ category.strCategory }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ allRecipes }
        >
          All
        </button>
        { renderDrinks() }
        <Footer />
      </div>
    )
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
