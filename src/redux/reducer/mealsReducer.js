import { SEARCH_MEALS } from '../action';

const INITIAL_STATE = {
  meals: [],
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_MEALS:
    return {
      meals: action.search,
    };
  default:
    return state;
  }
};

export default mealsReducer;
