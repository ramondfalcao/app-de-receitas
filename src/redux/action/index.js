export const LOGIN = 'LOGIN';
export const SEARCH_MEALS = 'SEARCH_MEALS';
export const SEARCH_DRINKS = 'SEARCH_DRINKS';
export const SEARCH_CATEGORY = 'SEARCH_CATEGORY';
export const FILTER = 'FILTER';
export const SEARCH_MEAL_ID = 'SEARCH_MEAL_ID';
export const SEARCH_DRINK_ID = 'SEARCH_DRINK_ID';
export const SEARCH_MEAL_RANDOM = 'SEARCH_MEAL_RANDOM';
export const SEARCH_DRINK_RANDOM = 'SEARCH_DRINK_RANDOM';
export const SEARCH_DRINK_INGREDIENTS = 'SEARCH_DRINK_INGREDIENTS';
export const SEARCH_MEALS_INGREDIENTS = 'SEARCH_MEALS_INGREDIENTS';
export const LOADING_ALL = 'SEARCH_MEALS_INGREDIENTS';

export const userLogin = (email) => ({
  type: LOGIN, email });

export const getMeals = (search) => ({
  type: SEARCH_MEALS, search,
});

export const getDrinks = (search) => ({
  type: SEARCH_DRINKS, search,
});

export const getCategory = (search) => ({
  type: SEARCH_CATEGORY, search,
});

export const getFilters = (search) => ({
  type: FILTER, search,
});

export const getMealId = (meal) => ({
  type: SEARCH_MEAL_ID, meal,
});

export const getDrinkId = (drink) => ({
  type: SEARCH_DRINK_ID, drink,
});

export const getMealRandom = (mealRandom) => ({
  type: SEARCH_MEAL_RANDOM, mealRandom,
});

export const getDrinkRandom = (drinkRandom) => ({
  type: SEARCH_DRINK_RANDOM, drinkRandom,
});

export const getDrinkIngredients = (drinkIngredients) => ({
  type: SEARCH_DRINK_INGREDIENTS, drinkIngredients,
});

export const getMealsIngredients = (mealsIngredients) => ({
  type: SEARCH_MEALS_INGREDIENTS, mealsIngredients,
});

export const loadingAll = (loading) => ({
  type: SEARCH_MEALS_INGREDIENTS, loading,
});
