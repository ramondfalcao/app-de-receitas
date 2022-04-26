import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'react-redux';
import rootReducer from '../reducer';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
