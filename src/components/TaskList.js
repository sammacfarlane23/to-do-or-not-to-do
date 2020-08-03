import React, { useContext, useEffect, useState } from 'react';
import Item from './Item';
import LoadingPage from './LoadingPage';
import DateEdit from '../components/DateEdit';
import ExistingHabitsList from './ExistingHabitsList';
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

  useEffect(() => {
    startSetTasks(dateRef);
    setRenderList(true);
  }, []);

  return renderList ? (
    <div className='task-list'>
      <div className='date-title'>
        <DateEdit className='date' />
      </div>
      <ExistingHabitsList />
      <button
        onClick={() => startRemoveAllTasks(tasks, dateRef)}
        className='button'
      >
        Remove All
      </button>
      <div className='item-list'>
        {tasks.length > 0 ? (
          tasks
            .sort(sortTasks)
            .map((task) => <Item key={task.id} task={task} />)
        ) : (
          <div>
            <span>No tasks</span>
          </div>
        )}
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};
