import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../redux/action';

function Login() {
  const users = useSelector((state) => state.userReducer.email);
  /* const user = useSelector((state) => state.authentication.user); */
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();

  const handleLocalStorage = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    const savedEmail = JSON.stringify({ email });
    localStorage.setItem('user', savedEmail);

    history.push('/foods');
  };

  const handleLoginValidation = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const minLengthPassword = 6;
    const validEmail = emailRegex.test(email);
    if (validEmail && password.length >= minLengthPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  function handleChange({ target: { name, value } }) {
    const login = {
      email: () => setEmail(value),
      password: () => setPassword(value),
    };
    login[name]();
    handleLoginValidation();
  }

  return (
    <>
      <h1>Login</h1>
      <p>{users}</p>
      <form>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
          /* onChange={ (({ target }) => setEmail(target.value), handleLoginValidation) } */
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ handleChange }
          /* onChange={ (({ target }) => setPassword(target.value), handleLoginValidation) } */
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          onClick={ (() => dispatch(userLogin(email)), handleLocalStorage) }
          disabled={ buttonDisabled }
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
