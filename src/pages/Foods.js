import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardMeals from '../components/CardMeals';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { callApiFoods } from '../redux/action/actionsAsysc';

export default function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.mealsReducer.meals);
  const [goat, setGoat] = useState('');
  const [filter, setFilter] = useState('');

  function renderMeals() {
    if (foods === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (foods.length === 1) {
      return history.push(`/foods/${foods[0].idMeal}`);
    }
    return <CardMeals mazimumArraySize={ 12 } testid="-recipe-card" />;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callApiFoods('', 'all'));
    dispatch(callApiFoods('', 'categories'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useSelector((state) => state.mealsReducer.categories);
  const MAXIMUM_ARRAY_SIZE = 5;
  let buttonsCategories = [];
  if (categories !== undefined) {
    buttonsCategories = categories.slice(0, MAXIMUM_ARRAY_SIZE);
  }

  const requestFilter = ({ target }) => {
    const { name } = target;
    if (filter === '') {
      dispatch(callApiFoods(name, 'filter'));
      setFilter(name);
      setGoat(name);
    }
    if (name !== filter) {
      dispatch(callApiFoods(name, 'filter'));
      setFilter(name);
      setGoat(name);
    }
    if (filter === name) {
      dispatch(callApiFoods('', 'all'));
    }
  };

  const allRecipes = () => {
    dispatch(callApiFoods('', 'all'));
  };

  return (
    (dispatch(callApiFoods('', 'categories'))),
    (
      <div>
        <Header title="Foods" search />
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
        {
          goat === 'Goat'
            ? <CardMeals />
            : renderMeals()
        }
        <Footer />
      </div>
    )
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
