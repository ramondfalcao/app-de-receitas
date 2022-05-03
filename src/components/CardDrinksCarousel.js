import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function CardDrinksCarousel({ mazimumArraySize, testid }) {
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const showDrinks = drinks.slice(0, mazimumArraySize);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <section className="container-card-carousel">
      <Slider { ...settings }>
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
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                { drink.strDrink }
              </h3>
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
}

CardDrinksCarousel.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
