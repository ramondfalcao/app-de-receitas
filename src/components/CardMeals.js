import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CardDrinks() {
  const foods = useSelector((state) => state.mealsReducer.meals);
  const MAXIMUM_ARRAY_SIZE = 12;
  const showMeals = foods.slice(0, MAXIMUM_ARRAY_SIZE);
  return (
    <div>
      {showMeals.map((meal, index) => (
        <Link
          key={ meal.idMeal }
          to={ `/foods/${meal.idMeal}` }
        >
          <div
            data-testid={ `${index}-recipe-card` }
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
