import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth, signInWithGoogle } from '../firebase/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (e, email, password) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError('Error Signing up with email and password');
    }

    setEmail('');
    setPassword('');
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
    <div className='login'>
      <h1>Sign Up</h1>
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
              createUserWithEmailAndPasswordHandler(e, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p className='login__text'>or</p>
        <button
          onClick={() => signInWithGoogle()}
          className='button button--sign-in'
        >
          Sign In with Google
        </button>
        <p className='login__text'>
          Already have an account?{' '}
          <Link to='/' className='login__link'>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
