import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinksReducer';

const rootReducer = combineReducers({
  userReducer,
  mealsReducer,
  drinksReducer,
});

export default rootReducer;
