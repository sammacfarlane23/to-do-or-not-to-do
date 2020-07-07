import React, { useContext, useEffect } from 'react';
import Item from './Item';
import DateEdit from '../components/DateEdit';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const {
    startSetTasks,
    addHabitsToTodoList,
    startSetHabits,
    tasks,
    habits,
    dateRef,
  } = useContext(GlobalContext);

  const viewState = () => {
    console.log('tasks: ', tasks);
    console.log('habits:', habits);
  };
  useEffect(() => {
    startSetTasks(dateRef);
  }, [tasks]);

  useEffect(() => {
    startSetHabits();
  }, [habits]);

  return (
    <div>
      <div className='date-title'>
        <DateEdit className='date' /> <h2>To-do List</h2>
      </div>
      <button onClick={() => viewState()}>View State</button>
      <div className='item-list'>
        <button onClick={() => addHabitsToTodoList()}>
          Add habits to to-do list
        </button>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Item key={task.id} task={task}>
              <h1>{task.name}</h1>
            </Item>
          ))
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  );
};
