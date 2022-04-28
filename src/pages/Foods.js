import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import CardMeals from '../components/CardMeals';

export default function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.mealsReducer.meals);
  function renderMeals() {
    if (foods === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (foods.length === 1) {
      return history.push(`/foods/${foods[0].idMeal}`);
    }
    return <CardMeals />;
  }
  return (
    <div>
      <Header title="Foods" search />
      { renderMeals() }
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
