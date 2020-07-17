import React, { useState, useContext, useEffect } from 'react';
import ItemModal from './ItemModal';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const {
    startRemoveTask,
    startEditTask,
    startCompleteHabit,
    startUndoCompleteHabit,
    dateRef,
    isCompleteToday,
  } = useContext(GlobalContext);

  let defaultHabitCompletedToday;
  if (props.habit) {
    if (props.habit.includes(dateRef)) {
      defaultHabitCompletedToday = true;
    } else {
      defaultHabitCompletedToday = false;
    }
  } else {
    defaultHabitCompletedToday = props.completed;
  }

  const [showModal, setShowModal] = useState(false);
  const [habitCompletedToday, setHabitCompletedToday] = useState(
    defaultHabitCompletedToday
  );

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

  // const isCompleteToday = () => {
  //   let completedToday;
  //   if (props.task.completed) {
  //     if (props.task.habit) {
  //       props.task.completed.forEach((date) => {
  //         if (date === dateRef) {
  //           return (completedToday = true);
  //         } else completedToday = false;
  //       });
  //     } else {
  //       completedToday = props.task.completed;
  //     }
  //   } else {
  //     completedToday = false;
  //   }
  //   setHabitCompletedToday(completedToday);
  // };

  useEffect(() => {
    setHabitCompletedToday(isCompleteToday(props.task, dateRef));
  });

  return (
    <div className='item'>
      <div className='checkbox-name'>
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
          <h1 className='task-name'>{props.task.name}</h1>
          {props.task.habit ? (
            <p className='task-type'>Habit</p>
          ) : (
            <p className='task-type'>Task</p>
          )}
        </button>
      </div>
      <button
        onClick={() => startRemoveTask({ id: props.task.id }, dateRef)}
        className='button button--remove'
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
