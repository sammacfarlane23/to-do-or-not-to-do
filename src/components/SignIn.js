import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@reach/router';
import { auth, signInWithGoogle } from '../firebase/firebase';
import Footer from './Footer';

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (e, email, password) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError('Error signing in with password and email!');
      console.error('Error signing in with password and email', error);
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <div className='login' id='sign-in'>
      <h1>Sign In</h1>
      <div className='login__container'>
        {error !== null && <div className='login__error'>{error}</div>}
        <form>
          <div className='login__inputs'>
            <label htmlFor='userEmail' className='login__label'>
              Email:
            </label>
            <input
              type='email'
              className='login__input-text'
              name='userEmail'
              value={email}
              placeholder='Your email'
              id='userEmail'
              onChange={(e) => onChangeHandler(e)}
            />
            <label htmlFor='userPassword' className='login__label'>
              Password:
            </label>
            <input
              type='password'
              className='login__input-text'
              name='userPassword'
              value={password}
              placeholder='Your Password'
              id='userPassword'
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <button
            className='button button--sign-in'
            onClick={(e) => {
              signInWithEmailAndPasswordHandler(e, email, password);
              history.push('/');
            }}
          >
            Sign in
          </button>
        </form>
        <p className='login__text'>or</p>
        <button
          onClick={() => signInWithGoogle()}
          className='button button--sign-in'
        >
          Sign in with Google
        </button>
        <p className='login__text'>
          Don't have an account?{' '}
          <Link to='signUp' className='login__link'>
            Sign up here
          </Link>{' '}
          <br />{' '}
          <Link to='passwordReset' className='login__link'>
            Forgot Password?
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};
export default SignIn;
