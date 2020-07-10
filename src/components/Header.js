import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='header-content'>
      <h1 className='title'>To-do or Not To-do</h1>
      <Link to='/'>Home</Link>
      <Link to='/habits'>My Habits</Link>
    </div>
  );
};
