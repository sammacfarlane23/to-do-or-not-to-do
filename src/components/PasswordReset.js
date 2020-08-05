import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth } from '../firebase/firebase';
import Footer from './Footer';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
  };

  const sendResetEmail = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError('Error resetting password');
      });
  };

  return (
    <div className='login' id='sign-in'>
      <h1>Reset your Password</h1>
      <div className='login__container'>
        <form>
          {emailHasBeenSent && (
            <div className='login__error'>An email has been sent to you!</div>
          )}
          {error !== null && <div className='login__error'>{error}</div>}
          <div className='login__inputs'>
            <label htmlFor='userEmail' className='login__label'>
              Email:
            </label>
            <input
              type='email'
              name='userEmail'
              id='userEmail'
              value={email}
              placeholder='Input your email'
              onChange={onChangeHandler}
              className='login__input-text'
            />
          </div>
          <button
            onClick={(e) => sendResetEmail(e)}
            className='button button--sign-in'
          >
            Send me a reset link
          </button>
        </form>
        <p className='login__text'>
          <Link to='/' className='login__link'>
            &larr; back to sign in page
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};
export default PasswordReset;
