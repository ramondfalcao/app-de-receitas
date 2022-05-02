import { getDrinks, getMeals, getCategory } from '.';
import {
  requestDrinksFirstLetter,
  requestDrinksIngredient,
  requestDrinksName,
  requestAllDrinks,
  requestCategoryDrinks,
  requestFilterDrinks,
} from '../../services/ApiDrinks';
import {
  requestMealsFirstLetter,
  requestMealsIngredient,
  requestMealsName,
  requestAllMeals,
  requestCategoryMeals,
  requestFilterMeals,
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
