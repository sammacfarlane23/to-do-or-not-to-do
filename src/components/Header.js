import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';

export default () => {
  const history = useHistory();
  return (
    <div className='header-content'>
      <h1 className='title'>To-do or Not To-do</h1>
      <NavLink
        className='nav-link'
        to='/'
        activeStyle={{
          fontWeight: 'bold',
        }}
        exact
      >
        Home
      </NavLink>
      <NavLink
        className='nav-link'
        to='/habits'
        activeStyle={{
          fontWeight: 'bold',
        }}
      >
        My Habits
      </NavLink>
      <button
        className='button'
        onClick={() => {
          auth.signOut();
          history.push('/');
        }}
      >
        Sign out
      </button>
    </div>
  );
};
