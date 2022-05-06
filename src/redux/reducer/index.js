import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinksReducer';
import loadingAllReducer from './loadingAllReducer';

const rootReducer = combineReducers({
  userReducer,
  mealsReducer,
  drinksReducer,
  loadingAllReducer,
});

export default rootReducer;
