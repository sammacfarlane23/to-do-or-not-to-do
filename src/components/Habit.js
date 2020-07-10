import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const { startRemoveHabit, changeDate, calculateStreak, date } = useContext(
    GlobalContext
  );

  useEffect(() => changeDate(moment().valueOf()), []);

  return (
    <div>
      <h3>{props.habit.name}</h3>
      <button
        onClick={() => startRemoveHabit(props.habit.id, props.habit.createdAt)}
      >
        Remove
      </button>
      <p>Habit since: {moment(props.habit.createdAt).format('Do MMM YYYY')}</p>
      <p>
        Habit completed{' '}
        {props.habit.completed ? props.habit.completed.length : 0} times
      </p>
      <p>
        {props.habit.completed
          ? props.habit.completed.map((date) => <p>{date}</p>)
          : 0}
      </p>
      <p>
        Streak: {calculateStreak(props.habit.completed, props.habit.createdAt)}{' '}
        days
      </p>
    </div>
  );
};
