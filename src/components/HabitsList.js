import React, { useContext, useEffect } from 'react';
import Habit from './Habit';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { startSetHabits, habits } = useContext(GlobalContext);
  useEffect(() => startSetHabits());
  const viewState = () => {
    console.log('habits:', habits);
  };

  return (
    <div>
      <button onClick={() => viewState()}>View State</button>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </div>
  );
};
