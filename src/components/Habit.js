import React, { useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const {
    startRemoveHabit,
    calculateCurrentStreak,
    calculateLongestStreak,
  } = useContext(GlobalContext);

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
        {calculateCurrentStreak(props.habit.completed, props.habit.createdAt)}{' '}
        days
      </p>
      <p className='habit-info'>
        Longest Streak:{' '}
        {calculateLongestStreak(props.habit.completed, props.habit.createdAt)}
      </p>
      <button
        onClick={() => startRemoveHabit(props.habit.id, props.habit.createdAt)}
      >
        x
      </button>
    </div>
  );
};
