import React, { useContext, useEffect } from 'react';
import Habit from './Habit';
import { GlobalContext } from '../context/GlobalState';
import LoadingPage from './LoadingPage';

export default () => {
  const { startSetHabits, habits } = useContext(GlobalContext);
  useEffect(() => startSetHabits(), [habits]);

  return habits ? (
    <div className='habits-list'>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </div>
  ) : (
    <LoadingPage />
  );
};
