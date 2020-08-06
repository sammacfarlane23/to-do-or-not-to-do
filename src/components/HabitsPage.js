import React, { useContext, useState } from 'react';
import HabitsList from './HabitsList';
import AddItem from './AddItem';

export default () => {
  return (
    <div className='habits-page'>
      <h1 className='habits-page__title'>My Habits</h1>
      <HabitsList />
      <AddItem showHabitSwitch={false} />
    </div>
  );
};
