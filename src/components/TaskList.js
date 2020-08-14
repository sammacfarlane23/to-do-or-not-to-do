import React, { useContext, useEffect, useState } from 'react';
import Item from './Item';
import LoadingPage from './LoadingPage';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const {
    startSetTasks,
    startRemoveAllTasks,
    tasks,
    dateRef,
    sortTasks,
  } = useContext(GlobalContext);

  const [renderList, setRenderList] = useState(false);
  const [showHabits, setShowHabits] = useState(false);

  useEffect(() => {
    startSetTasks(dateRef);
    setRenderList(true);
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
