import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CardDrinks() {
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const MAXIMUM_ARRAY_SIZE = 12;
  const showDrinks = drinks.slice(0, MAXIMUM_ARRAY_SIZE);
  return (
    <div>
      {showDrinks.map((drink, index) => (
        <Link
          key={ drink.idDrink }
          to={ `/drinks/${drink.idDrink}` }
        >
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
