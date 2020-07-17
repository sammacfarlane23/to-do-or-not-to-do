import React, { useContext, useEffect } from 'react';
import Item from './Item';
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

  useEffect(() => {
    startSetTasks(dateRef);
  }, [tasks]);

  return (
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
  );
};
