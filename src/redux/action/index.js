export const LOGIN = 'LOGIN';
export const SEARCH_MEALS = 'SEARCH_MEALS';
export const SEARCH_DRINKS = 'SEARCH_DRINKS';

export const userLogin = (email) => ({
  type: LOGIN, email });

export const getMeals = (search) => ({
  type: SEARCH_MEALS, search,
});

export const getDrinks = (search) => ({
  type: SEARCH_DRINKS, search,
});
