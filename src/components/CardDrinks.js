import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CardDrinks.css';

export default function CardDrinks({ mazimumArraySize, testid }) {
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const showDrinks = drinks.slice(0, mazimumArraySize);

  return (
    <section className="cards-container">
      {showDrinks.map((drink, index) => (
        <div key={ drink.idDrink } className="card-drink">
          <Link
            className="link-drink"
            to={ `/drinks/${drink.idDrink}` }
          >
            <div
              data-testid={ `${index}${testid}` }
            >
              <img
                className="img-drinks"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p
                className="title-cards-drink "
                data-testid={ `${index}-card-name` }
              >
                { drink.strDrink }
              </p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}

CardDrinks.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
