import {
  getDrinks,
  getMeals,
  getCategory,
  getMealId,
  getDrinkId,
  getMealRandom,
  getDrinkRandom,
  getDrinkIngredients,
  getMealsIngredients,
} from '.';

import {
  requestDrinksFirstLetter,
  requestDrinksIngredient,
  requestDrinksName,
  requestAllDrinks,
  requestCategoryDrinks,
  requestFilterDrinks,
  requestDrinkId,
  requestDrinkRandom,
  requestDrinkIngredients,
} from '../../services/ApiDrinks';

import {
  requestMealsFirstLetter,
  requestMealsIngredient,
  requestMealsName,
  requestAllMeals,
  requestCategoryMeals,
  requestFilterMeals,
  requestMealId,
  requestMealRandom,
  requestMealIngredients,
} from '../../services/ApiMeals';

export const callApiFoods = (search, type) => async (dispatch) => {
  switch (type) {
  case 'ingredients': {
    const response = await requestMealsIngredient(search);
    return dispatch(getMeals(response.meals));
  }
  case 'name': {
    const response = await requestMealsName(search);
    return dispatch(getMeals(response.meals));
  }
  case 'letter': {
    const response = await requestMealsFirstLetter(search);
    return dispatch(getMeals(response.meals));
  }
  case 'all': {
    const response = await requestAllMeals();
    return dispatch(getMeals(response.meals));
  }
  case 'categories': {
    const response = await requestCategoryMeals();
    return dispatch(getCategory(response.meals));
  }
  case 'filter': {
    const response = await requestFilterMeals(search);
    return dispatch(getMeals(response.meals));
  }
  default:
    break;
  }
};

export const callApiDrinks = (search, type) => async (dispatch) => {
  switch (type) {
  case 'ingredients': {
    const response = await requestDrinksIngredient(search);
    return dispatch(getDrinks(response.drinks));
  }
  case 'name': {
    const response = await requestDrinksName(search);
    return dispatch(getDrinks(response.drinks));
  }
  case 'letter': {
    const response = await requestDrinksFirstLetter(search);
    return dispatch(getDrinks(response.drinks));
  }
  case 'all': {
    const response = await requestAllDrinks();
    return dispatch(getDrinks(response.drinks));
  }
  case 'categories': {
    const response = await requestCategoryDrinks();
    return dispatch(getCategory(response.drinks));
  }
  case 'filter': {
    const response = await requestFilterDrinks(search);
    return dispatch(getDrinks(response.drinks));
  }
  default:
    break;
  }
};

export const callApiFoodsOfId = (id) => async (dispatch) => {
  const response = await requestMealId(id);
  return dispatch(getMealId(response.meals));
};

export const callApiDrinkOfId = (id) => async (dispatch) => {
  const response = await requestDrinkId(id);
  return dispatch(getDrinkId(response.drinks));
};

export const callApiFoodRandom = () => async (dispatch) => {
  const response = await requestMealRandom();
  console.log(response);
  return dispatch(getMealRandom(response.meals));
};

export const callApiDrinkRandom = () => async (dispatch) => {
  const response = await requestDrinkRandom();
  console.log(response);
  return dispatch(getDrinkRandom(response.drinks));
};

export const callApiDrinkIngredients = () => async (dispatch) => {
  const response = await requestDrinkIngredients();
  console.log(response);
  return dispatch(getDrinkIngredients(response.drinks));
};

export const callApiMealIngredients = () => async (dispatch) => {
  const response = await requestMealIngredients();
  console.log(response);
  return dispatch(getMealsIngredients(response.meals));
};
