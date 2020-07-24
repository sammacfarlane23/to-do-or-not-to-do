import React, { useContext, useEffect } from 'react';
import Habit from './Habit';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { startSetHabits, habits } = useContext(GlobalContext);
  useEffect(() => startSetHabits(), [habits]);

  return (
    <div className='habits-list'>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </div>
  );
};
