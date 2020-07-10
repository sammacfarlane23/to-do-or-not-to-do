import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const {
    startAddItemToToDo,
    startAddHabitAndTask,
    dateRef,
    date,
  } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [habit, setHabit] = useState(false);
  const [taskCompleted] = useState(false);

  const addNewTask = (e) => {
    e.preventDefault();
    if (habit) {
      startAddHabitAndTask({ name, habit, createdAt: date }, dateRef);
    } else {
      startAddItemToToDo(
        { name, habit, createdAt: date, completed: taskCompleted },
        dateRef
      );
    }
    setHabit(false);
    setName('');
    document.getElementById('checkbox').checked = false;
  };

  return (
    <form onSubmit={addNewTask} className='add-item-form'>
      <div>
        <input
          type='text'
          placeholder='Enter a new task'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className='add-button'>+</button>
      </div>
      <div className='habit-switch'>
        {habit ? (
          <p className='task-type'>One-off Task</p>
        ) : (
          <p className='task-type'>
            <strong>One-off Task</strong>
          </p>
        )}
        <label className='switch'>
          <input
            id='checkbox'
            type='checkbox'
            className='switch-button'
            onChange={(e) => setHabit(e.target.checked)}
            defaultChecked={false}
          />
          <span className='slider'></span>
        </label>
        {habit ? (
          <p className='task-type'>
            <strong>Habit</strong>
          </p>
        ) : (
          <p className='task-type'>Habit</p>
        )}
      </div>
    </form>
  );
};
