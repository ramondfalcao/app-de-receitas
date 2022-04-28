import { SEARCH_DRINKS } from '../action';

const INITIAL_STATE = {
  drinks: [],
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_DRINKS:
    return {
      drinks: action.search,
    };
  default:
    return state;
  }
};

export default drinksReducer;
