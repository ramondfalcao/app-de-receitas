import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  userReducer,
  mealsReducer,
});

export default rootReducer;
