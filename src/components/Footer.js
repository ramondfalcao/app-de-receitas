import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" alt="drinkIcon" src={ drinkIcon } />
      </Link>
      <Link to="/explore">
        <img data-testid="explore-bottom-btn" alt="exploreIcon" src={ exploreIcon } />
      </Link>
      <Link to="/foods">
        <img data-testid="food-bottom-btn" alt="foodIcon" src={ mealIcon } />
      </Link>
    </footer>
  );
}
