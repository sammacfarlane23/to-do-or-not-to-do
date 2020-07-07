import React, { useState, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { startAddItemToToDo, startAddHabitAndTask, dateRef } = useContext(
    GlobalContext
  );
  const [name, setName] = useState('');
  const [habit, setHabit] = useState(false);
  const [createdAt] = useState(moment().startOf('day').valueOf());
  const [taskCompleted] = useState(false);

  const addNewTask = (e) => {
    e.preventDefault();
    if (habit) {
      startAddHabitAndTask({ name, habit, createdAt }, dateRef);
    } else {
      startAddItemToToDo(
        { name, habit, createdAt, completed: taskCompleted },
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
        <button>Add Item</button>
      </div>
      <div className='habit-switch'>
        {habit ? (
          <p>One-off Task</p>
        ) : (
          <p>
            <strong>One-off Task</strong>
          </p>
        )}
        <label className='switch'>
          <input
            id='checkbox'
            type='checkbox'
            onChange={(e) => setHabit(e.target.checked)}
            defaultChecked={false}
          />
          <span className='slider'></span>
        </label>
        {habit ? (
          <p>
            <strong>Habit</strong>
          </p>
        ) : (
          <p>Habit</p>
        )}
      </div>
    </form>
  );
};
