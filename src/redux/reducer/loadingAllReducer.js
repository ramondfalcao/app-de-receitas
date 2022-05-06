import { LOADING_ALL } from '../action';

const INITIAL_STATE = {
  loadingAll: true,
};

function loadingAllReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_ALL:
    return {
      loadingAll: action.loading,
    };
  default:
    return state;
  }
}
export default loadingAllReducer;
