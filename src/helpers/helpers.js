export function favoriteMealsLocalStorage(recipe, type) {
  const object = {
    id: recipe.idMeal,
    type,
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isfavorite = favoriteRecipes && favoriteRecipes
    .some(({ id }) => +recipe.idMeal === +id);
  if (favoriteRecipes && !isfavorite) {
    const newFavoriteRecipes = [...favoriteRecipes, object];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  } else if (isfavorite) {
    const newFavoriteRecipes = favoriteRecipes.filter(({ id }) => +recipe.idMeal !== +id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([object]));
  }
}

export function favoriteDrinksLocalStorage(recipe, type) {
  const object = {
    id: recipe.idDrink,
    type,
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isfavorite = favoriteRecipes && favoriteRecipes
    .some(({ id }) => +recipe.idDrink === +id);
  if (favoriteRecipes && !isfavorite) {
    const newFavoriteRecipes = [...favoriteRecipes, object];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  } else if (isfavorite) {
    const newFavoriteRecipes = favoriteRecipes
      .filter(({ id }) => +recipe.idDrink !== +id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([object]));
  }
}

function inProgressRecipesMeals(id, item) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const meals = inProgress.meals[id];
  if (meals && meals.includes(item)) {
    const newMeals = meals.filter((itemMeal) => itemMeal !== item);
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify(inProgress.meals[id] = newMeals));
  } else {
    const newMeals = [...meals, item];
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify(inProgress.meals[id] = newMeals));
  }
}

export {
  inProgressRecipesMeals,
};
