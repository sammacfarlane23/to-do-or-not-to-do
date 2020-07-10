import React, { useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const { startRemoveHabit, calculateStreak } = useContext(GlobalContext);

  return (
    <div className='habit-tile'>
      <h3 className='habit-title'>{props.habit.name}</h3>
      <p className='habit-info'>
        Habit since: {moment(props.habit.createdAt).format('DD/MM/YY')}
      </p>
      {props.habit.completed ? (
        <p className='habit-info'>
          {props.habit.completed.length} total completions
        </p>
      ) : (
        <p className='habit-info'>Habit not yet completed</p>
      )}
      <p className='habit-info'>
        Current Streak:{' '}
        {calculateStreak(props.habit.completed, props.habit.createdAt)} days
      </p>
      <button
        onClick={() => startRemoveHabit(props.habit.id, props.habit.createdAt)}
      >
        x
      </button>
    </div>
  );
};
