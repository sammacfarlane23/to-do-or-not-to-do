import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const {
    startRemoveTask,
    startEditTask,
    startCompleteHabit,
    startUndoCompleteHabit,
    dateRef,
    calculateCurrentStreak,
    isCompleteToday,
  } = useContext(GlobalContext);

  const completeTask = () => {
    if (!props.task.habit) {
      const updates = { completed: !props.task.completed };
      startEditTask(props.task.id, updates, dateRef);
    } else {
      isCompleteToday(props.task, dateRef)
        ? startUndoCompleteHabit(props.task.id, props.task.createdAt, dateRef)
        : startCompleteHabit(props.task.id, props.task.createdAt, dateRef);
    }
  };

  return (
    <div className='item'>
      <div className='checkbox-name'>
        {!isCompleteToday(props.task, dateRef) && (
          <label className='checkbox-container'>
            <input type='checkbox' onChange={() => completeTask()} />
            <span className='checkmark'></span>
          </label>
        )}
        {isCompleteToday(props.task, dateRef) && (
          <label className='checkbox-container'>
            <input
              type='checkbox'
              checked='checked'
              onChange={() => completeTask()}
            />
            <span className='checkmark'></span>
          </label>
        )}
        <h1 className='task-name'>{props.task.name}</h1>
      </div>
      {!props.showHabits &&
        props.task.habit &&
        !(
          calculateCurrentStreak(props.task.completed, props.task.createdAt) ===
          0
        ) && (
          <p className='habit-streak'>
            {calculateCurrentStreak(props.task.completed, props.task.createdAt)}
            🔥
          </p>
        )}
      <button
        onClick={() =>
          startRemoveTask(
            { id: props.task.id, createdAt: props.task.createdAt },
            dateRef
          )
        }
        className='button button--remove'
      >
        Remove
      </button>
    </div>
  );
};
