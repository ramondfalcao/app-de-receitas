import { SEARCH_MEALS, SEARCH_CATEGORY } from '../action';

const INITIAL_STATE = {
  meals: [],
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_MEALS:
    return {
      meals: action.search,
    };
  case SEARCH_CATEGORY:
    return {
      ...state,
      categories: action.search,
    };
  default:
    return state;
  }
};

export default mealsReducer;
