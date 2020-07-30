import React, { useContext, useEffect, useState } from 'react';
import Habit from './Habit';
import { GlobalContext } from '../context/GlobalState';
import LoadingPage from './LoadingPage';

export default () => {
  const { startSetHabits, habits } = useContext(GlobalContext);
  const [renderList, setRenderList] = useState(false);

  useEffect(() => {
    startSetHabits();
    setRenderList(true);
  }, [habits]);

  return renderList ? (
    <div className='habits-list'>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </div>
  ) : (
    <LoadingPage />
  );
};
