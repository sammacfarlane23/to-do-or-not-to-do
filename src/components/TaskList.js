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
  const [showHabits, setShowHabits] = useState(false);

  useEffect(() => {
    startSetTasks(dateRef);
    setRenderList(true);
  }, [dateRef, tasks]);

  return renderList ? (
    <div className='task-list'>
      <div className='date-title'>
        <DateEdit className='date' />
        <div>
          <button
            className='button button--show-habits'
            onClick={() => setShowHabits(!showHabits)}
          >
            {showHabits ? 'Hide' : 'Show'} habits {showHabits ? '-' : '+'}
          </button>
        </div>
      </div>
      {showHabits && <ExistingHabitsList />}
      {tasks.length > 0 && (
        <button
          onClick={() => startRemoveAllTasks(tasks, dateRef)}
          className='button'
        >
          Remove All
        </button>
      )}
      <div className='item-list'>
        {tasks.length > 0 ? (
          tasks
            // For some reason this briefly adds two of a task before deleting one
            .sort(sortTasks)
            .map((task) => (
              <Item showHabits={showHabits} key={task.id} task={task} />
            ))
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
