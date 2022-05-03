import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CardMeals({ mazimumArraySize, testid }) {
  const foods = useSelector((state) => state.mealsReducer.meals);
  const showMeals = foods.slice(0, mazimumArraySize);

  return (
    <div>
      {showMeals.map((meal, index) => (
        <Link
          key={ meal.idMeal }
          to={ `/foods/${meal.idMeal}` }
        >
          <div
            data-testid={ `${index}${testid}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { meal.strMeal }
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

CardMeals.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
