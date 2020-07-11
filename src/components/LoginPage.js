import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { startGoogleLogin } = useContext(GlobalContext);

  return (
    <div>
      <h1>Welcome to To-do or Not To-do</h1>
      <button onClick={startGoogleLogin()} type='button'>
        Login
      </button>
    </div>
  );
};
