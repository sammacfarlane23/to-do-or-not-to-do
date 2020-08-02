import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth, signInWithGoogle } from '../firebase/firebase';

const SignIn = () => {
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
    <div className=''>
      <h1 className=''>Sign In</h1>
      <div className=''>
        {error !== null && <div className=''>{error}</div>}
        <form className=''>
          <label htmlFor='userEmail' className=''>
            Email:
          </label>
          <input
            type='email'
            className=''
            name='userEmail'
            value={email}
            placeholder='Your email'
            id='userEmail'
            onChange={(e) => onChangeHandler(e)}
          />
          <label htmlFor='userPassword' className=''>
            Password:
          </label>
          <input
            type='password'
            className=''
            name='userPassword'
            value={password}
            placeholder='Your Password'
            id='userPassword'
            onChange={(e) => onChangeHandler(e)}
          />
          <button
            className=''
            onClick={(e) => {
              signInWithEmailAndPasswordHandler(e, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p className=''>or</p>
        <button onClick={() => signInWithGoogle()} className=''>
          Sign in with Google
        </button>
        <p className=''>
          Don't have an account?{' '}
          <Link to='signUp' className=''>
            Sign up here
          </Link>{' '}
          <br />{' '}
          <Link to='passwordReset' className=''>
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
