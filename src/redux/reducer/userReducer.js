import { LOGIN } from '../action';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      email: action.email,
    };
  default:
    return state;
  }
}
export default userReducer;
