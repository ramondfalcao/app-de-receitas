import { SEARCH_DRINKS, SEARCH_CATEGORY, SEARCH_DRINK_ID } from '../action';

const INITIAL_STATE = {
  drinks: [],
  drink: {},
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_DRINKS:
    return {
      ...state,
      drinks: action.search,
    };
  case SEARCH_CATEGORY:
    return {
      ...state,
      categories: action.search,
    };
  case SEARCH_DRINK_ID:
    return {
      ...state,
      drink: action.drink[0],
    };
  default:
    return state;
  }
};

export default drinksReducer;
