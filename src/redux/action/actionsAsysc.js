import { getDrinks, getMeals } from '.';
import {
  requestDrinksFirstLetter,
  requestDrinksIngredient,
  requestDrinksName,
} from '../../services/ApiDrinks';
import {
  requestMealsFirstLetter,
  requestMealsIngredient,
  requestMealsName,
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
  default:
    break;
  }
};
