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

export function inProgressRecipesMeals(id, item) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const meals = inProgress.meals[id];
  if (meals && meals.includes(item)) {
    const newMeals = meals.filter((itemMeal) => itemMeal !== item);
    inProgress.meals[id] = newMeals;
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify(inProgress));
    return inProgress;
  }
  const newMeals = [...meals, item];
  inProgress.meals[id] = newMeals;
  localStorage
    .setItem('inProgressRecipes', JSON
      .stringify(inProgress));
  return inProgress;
}

export function inProgressRecipesDrinks(id, item) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const drink = inProgress.cocktails[id];
  if (drink && drink.includes(item)) {
    const newDrink = drink.filter((itemDrink) => itemDrink !== item);
    inProgress.cocktails[id] = newDrink;
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify(inProgress));
    return inProgress;
  }
  const newDrink = [...drink, item];
  inProgress.cocktails[id] = newDrink;
  localStorage
    .setItem('inProgressRecipes', JSON
      .stringify(inProgress));
  return inProgress;
}

export function doneRecipesMeals(item) {
  const object = {
    id: item.idMeal,
    type: 'comida',
    nationality: item.strArea,
    category: item.strCategory,
    alcoholicOrNot: '',
    name: item.strMeal,
    image: item.strMealThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: item.strTags ? item.strTags.split(',') : [],
  };
  const result = JSON.parse(localStorage.getItem('doneRecipes'));
  const newDoneRecipesMeals = [...result, object];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesMeals));
}

export function doneRecipesDrinks(item) {
  const object = {
    id: item.idDrink,
    type: 'bebida',
    nationality: '',
    category: item.strCategory,
    alcoholicOrNot: item.strAlcoholic,
    name: item.strDrink,
    image: item.strDrinkThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: item.strTags ? item.strTags.split(',') : [],
  };
  const result = JSON.parse(localStorage.getItem('doneRecipes'));
  const newDoneRecipesDrinks = [...result, object];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesDrinks));
}
