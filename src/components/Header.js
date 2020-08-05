import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';

export default () => {
  const history = useHistory();
  return (
    <header className='header'>
      <div className='container'>
        <h1 className='header__title'>To-do or Not To-do</h1>
        <div className='header__links'>
          <div>
            <NavLink
              className='header__link'
              to='/'
              activeStyle={{
                fontWeight: 'bold',
              }}
              exact
            >
              Home
            </NavLink>
            <NavLink
              className='header__link'
              to='/habits'
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              My Habits
            </NavLink>
          </div>
          <button
            className='button button--sign-out'
            onClick={() => {
              auth.signOut();
              history.push('/');
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};
