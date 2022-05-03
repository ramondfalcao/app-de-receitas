import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CardDrinks({ mazimumArraySize, testid }) {
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const showDrinks = drinks.slice(0, mazimumArraySize);

  return (
    <div>
      {showDrinks.map((drink, index) => (
        <Link
          key={ drink.idDrink }
          to={ `/drinks/${drink.idDrink}` }
        >
          <div
            data-testid={ `${index}${testid}` }
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

CardDrinks.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
