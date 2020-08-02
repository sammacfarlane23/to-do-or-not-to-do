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
  }, []);

  return renderList ? (
    <div className='habits-list'>
      {habits.map((habit) => {
        // The message is triggered when a new habit or task is added
        // When added, id also prints as undefined
        // When first added new habit does not have an id,
        // upon refresh it has one
        // Habit being printed here does not match habit in database
        // Fixed by adding to an id to the state version of habit
        return <Habit key={habit.id} habit={habit} />;
      })}
    </div>
  ) : (
    <LoadingPage />
  );
};
