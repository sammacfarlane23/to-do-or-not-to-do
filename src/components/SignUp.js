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
    <div className=''>
      <h1 className=''>Sign Up</h1>
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
              createUserWithEmailAndPasswordHandler(e, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p className=''>or</p>
        <button onClick={() => signInWithGoogle()} className=''>
          Sign In with Google
        </button>
        <p className=''>
          Already have an account?{' '}
          <Link to='/' className=''>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
