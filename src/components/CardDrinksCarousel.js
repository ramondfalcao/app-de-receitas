import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function CardDrinksCarousel({ mazimumArraySize, testid }) {
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const showDrinks = drinks.slice(0, mazimumArraySize);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
    },
  });

  console.log(sliderRef);
  return (
    <div ref={ sliderRef } className="keen-slider">
      {showDrinks.map((drink, index) => (
        <Link
          key={ drink.idDrink }
          to={ `/drinks/${drink.idDrink}` }
          className="keen-slider__slide"
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

CardDrinksCarousel.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
