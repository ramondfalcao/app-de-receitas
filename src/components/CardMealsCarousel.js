import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './CardMealsCarousel.css';

export default function CardMealsCarousel({ mazimumArraySize, testid }) {
  const foods = useSelector((state) => state.mealsReducer.meals);
  const showMeals = foods.slice(0, mazimumArraySize);

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
        {showMeals.map((meal, index) => (
          <Link
            key={ meal.idMeal }
            to={ `/foods/${meal.idMeal}` }
          >
            <div
              data-testid={ `${index}${testid}` }
            >
              <img
                className="img-carousel"
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                { meal.strMeal }
              </h3>
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
}

CardMealsCarousel.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
