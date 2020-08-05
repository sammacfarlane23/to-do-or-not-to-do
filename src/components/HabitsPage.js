import React, { useContext, useState } from 'react';
import HabitsList from './HabitsList';
import AddItem from './AddItem';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  return (
    <div className='habits-page'>
      <h1 className='habits-page-title'>My Habits</h1>
      <HabitsList />
      <AddItem showHabitSwitch={false} />
    </div>
  );
};
