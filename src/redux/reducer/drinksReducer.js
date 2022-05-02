import { SEARCH_DRINKS, SEARCH_CATEGORY } from '../action';

const INITIAL_STATE = {
  drinks: [],
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_DRINKS:
    return {
      drinks: action.search,
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

export default drinksReducer;
