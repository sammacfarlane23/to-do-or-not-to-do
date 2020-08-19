import React, { useContext, useEffect, useState } from 'react';
import Item from './Item';
import LoadingPage from './LoadingPage';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { startSetTasks, tasks, dateRef, sortTasks } = useContext(
    GlobalContext
  );

  const [showHabits, setShowHabits] = useState(false);

  // This useEffect function with the tasks and dateRef dependencies means
  // that the startAddTask function does not have to update the state
  // as the state will be updated automatically here

  useEffect(() => {
    startSetTasks(dateRef);
  }, [dateRef, tasks]);

  return tasks.length > 0 ? (
    <div className='item-list'>
      {tasks.sort(sortTasks).map((task) => (
        <Item showHabits={showHabits} key={task.id} task={task} />
      ))}
    </div>
  ) : (
    <div className='empty-message'>
      <span>No tasks</span>
    </div>
  );
};
