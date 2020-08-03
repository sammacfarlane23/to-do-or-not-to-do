import React, { useState, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default ({ task, closeModal }) => {
  const [name, setName] = useState(task.name);
  const [habit] = useState(task.habit);
  const [createdAt] = useState(task.createdAt);

  const { startEditTask, startEditHabit, dateRef } = useContext(GlobalContext);

  const updates = { name, habit, createdAt };

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.habit) {
      startEditHabit(task.id, updates, task.createdAt);
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
    <form onSubmit={onSubmit} className='modal__body'>
      <input
        type='text'
        placeholder='Task Name'
        value={name}
        onChange={onTaskNameChange}
        className='name-edit'
      />
      <p>Habit since: {moment(createdAt).format('Do MMM YYYY')}</p>
      <button className='button button--habit'>Done</button>
    </form>
  );
};
