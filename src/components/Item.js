import React, { useState, useContext, useEffect } from 'react';
import ItemModal from './ItemModal';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const {
    startRemoveTask,
    startEditTask,
    startCompleteHabit,
    startUndoCompleteHabit,
    calculateStreak,
    dateRef,
    date,
  } = useContext(GlobalContext);

  const [showModal, setShowModal] = useState(false);
  const [habitCompletedToday, setHabitCompletedToday] = useState();

  const handleShowModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const completeTask = () => {
    if (!props.task.habit) {
      const updates = { completed: !props.task.completed };
      startEditTask(props.task.id, updates, dateRef);
    } else {
      habitCompletedToday
        ? startUndoCompleteHabit(props.task.id, dateRef)
        : startCompleteHabit(props.task.id, dateRef);
    }
  };

  const isCompleteToday = () => {
    let completedToday;
    if (props.task.completed) {
      if (props.task.habit) {
        props.task.completed.forEach((date) => {
          if (date === dateRef) {
            return (completedToday = true);
          } else completedToday = false;
        });
      } else {
        completedToday = props.task.completed;
      }
    } else {
      completedToday = false;
    }
    setHabitCompletedToday(completedToday);
  };

  useEffect(() => {
    isCompleteToday();
  });

  return (
    <div className='item'>
      {!habitCompletedToday && (
        <label className='checkbox-container'>
          <input type='checkbox' onChange={() => completeTask()} />
          <span className='checkmark'></span>
        </label>
      )}
      {habitCompletedToday && (
        <label className='checkbox-container'>
          <input
            type='checkbox'
            checked='checked'
            onChange={() => completeTask()}
          />
          <span className='checkmark'></span>
        </label>
      )}
      <button onClick={handleShowModal} className='item-name'>
        <h1>{props.task.name}</h1>
      </button>
      {props.task.habit ? <p>Habit</p> : <p>Task</p>}
      <button
        onClick={() => startRemoveTask({ id: props.task.id }, dateRef)}
        className='button button__remove'
      >
        Remove
      </button>
      <ItemModal
        showModal={showModal}
        closeModal={closeModal}
        task={props.task}
      />
    </div>
  );
};
