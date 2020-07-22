import React, { useState, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default ({ task, closeModal }) => {
  const [name, setName] = useState(task.name);
  const [habit] = useState(task.habit);
  const [createdAt] = useState(task.createdAt);
  const { startEditTask, startRemoveTask, dateRef } = useContext(GlobalContext);

  const updates = { name, habit, createdAt };

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.habit) {
      // Need to make this function next
      //startEditHabit();
    } else {
      startEditTask(task.id, updates, dateRef);
    }
    closeModal();
  };

  const onTaskNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Task Name'
        value={name}
        onChange={onTaskNameChange}
      />
      <p>Habit since: {moment(createdAt).format('Do MMM')}</p>
      <button type='button' onClick={() => startRemoveTask({ id: task.id })}>
        Remove
      </button>
      <button>Done</button>
    </form>
  );
};
