import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DetailsDrinks() {
  return (
    <div>
      <div>Tela de Detalhes Bebidas</div>
      <img data-testid="recipe-photo" alt="#" />
      <h1 data-testid="recipe-title">OI</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="white-heart-icon" />
      </button>
      <p data-testid="recipe-category" />
      {/* <h2 data-testid={ `${index}-ingredient-name-and-measure` }>Ingredient</h2> */}
      <p data-testid="instructions">Instructions</p>
      <media data-testid="video">video</media>
      {/* <p data-testid={ `${index}-recomendation-card` } /> */}
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>

    </div>
  );
}
