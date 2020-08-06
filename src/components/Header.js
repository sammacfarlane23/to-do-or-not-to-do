import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import ArrowLeftIcon from './ArrowLeftIcon';
import ArrowRightIcon from './ArrowRightIcon';

export default (props) => {
  const history = useHistory();
  const [location, setLocation] = useState(history.location.pathname);

  if (location === '/') {
    return (
      <div className='header'>
        <button
          className='button button--sign-out'
          onClick={() => {
            auth.signOut();
            props.history.push('/');
          }}
        >
          <ArrowLeftIcon />
          <p className='header__text'>Log Out</p>
        </button>
        <NavLink
          onClick={() => setLocation('/habits')}
          className='header__link'
          to='/habits'
          activeStyle={{
            fontWeight: 'bold',
          }}
        >
          <p className='header__text'>My Habits</p>
          <ArrowRightIcon />
        </NavLink>
      </div>
    );
  } else if (location === '/habits') {
    return (
      <div className='header'>
        <NavLink
          onClick={() => setLocation('/')}
          className='header__link'
          to='/'
          activeStyle={{
            fontWeight: 'bold',
          }}
        >
          <ArrowLeftIcon />
          <p className='header__text'>To-do List</p>
        </NavLink>
      </div>
    );
  }
};
