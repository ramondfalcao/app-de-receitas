import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function CardMealsCarousel({ mazimumArraySize, testid }) {
  const foods = useSelector((state) => state.mealsReducer.meals);
  const showMeals = foods.slice(0, mazimumArraySize);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
    },
  });

  return (
    <div ref={ sliderRef } className="keen-slider">
      {showMeals.map((meal, index) => (
        <Link
          key={ meal.idMeal }
          to={ `/foods/${meal.idMeal}` }
          className="keen-slider__slide"
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

CardMealsCarousel.propTypes = {
  mazimumArraySize: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};
