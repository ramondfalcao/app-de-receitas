import {
  SEARCH_MEALS,
  SEARCH_CATEGORY,
  SEARCH_MEAL_ID,
  SEARCH_MEAL_RANDOM,
} from '../action';

const INITIAL_STATE = {
  meals: [],
  meal: {},
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_MEALS:
    return {
      ...state,
      meals: action.search,
    };
  case SEARCH_CATEGORY:
    return {
      ...state,
      categories: action.search,
    };
  case SEARCH_MEAL_ID:
    return {
      ...state,
      meal: action.meal[0],
    };
  case SEARCH_MEAL_RANDOM:
    return {
      ...state,
      meal: action.mealRandom[0],
    };
  default:
    return state;
  }
};

export default mealsReducer;
