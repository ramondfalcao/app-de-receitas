import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardDrinks from '../components/CardDrinks';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { loadingAll } from '../redux/action';
import { callApiDrinks } from '../redux/action/actionsAsysc';

export default function Drinks(props) {
  const { history } = props;
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const loading = useSelector((state) => state.loadingAllReducer.loadingAll);

  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  function renderDrinks() {
    if (drinks === null) {
      dispatch(callApiDrinks('', 'all'));
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
    return <CardDrinks mazimumArraySize={ 12 } testid="-recipe-card" />;
  }

  useEffect(() => {
    console.log(loading);
    if (loading) {
      console.log('LOADING');
      dispatch(callApiDrinks('', 'all'));
    }
    console.log('FORA DO IF');
    dispatch(callApiDrinks('', 'categories'));
    dispatch(loadingAll(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
