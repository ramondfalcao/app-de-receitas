export const LOGIN = 'LOGIN';
export const SEARCH_MEALS = 'SEARCH_MEALS';
export const SEARCH_DRINKS = 'SEARCH_DRINKS';
export const SEARCH_CATEGORY = 'SEARCH_CATEGORY';
export const FILTER = 'FILTER';

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
