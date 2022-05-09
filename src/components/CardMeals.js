import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CardMeals.css';

export default function CardMeals({ mazimumArraySize, testid }) {
  const foods = useSelector((state) => state.mealsReducer.meals);
  const showMeals = foods.slice(0, mazimumArraySize);

  return (
    <section className="cards-container">
      {showMeals.map((meal, index) => (
        <div key={ meal.idMeal } className="card-food">
          <Link
            className="link-food"
            to={ `/foods/${meal.idMeal}` }
          >
            <div
              data-testid={ `${index}${testid}` }
            >
              <img
                className="img-foods"
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p
                className="title-cards-food"
                data-testid={ `${index}-card-name` }
              >
                { meal.strMeal }
              </p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}

CardMeals.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
