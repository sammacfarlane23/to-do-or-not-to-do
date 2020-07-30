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
  }, [tasks]);

  return renderList ? (
    <div className='task-list'>
      <ExistingHabitsList />
      <div className='date-title'>
        <DateEdit className='date' /> <h2>To-do List</h2>
      </div>
      <button onClick={() => startRemoveAllTasks(tasks, dateRef)}>
        Remove All
      </button>
      <div className='item-list'>
        {tasks.length > 0 ? (
          tasks
            .sort(sortTasks)
            .map((task) => <Item key={task.id} task={task} />)
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};
