import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const { startRemoveTask, changeDate, calculateStreak, date } = useContext(
    GlobalContext
  );

  useEffect(() => changeDate(moment().valueOf()), []);

  // Steps for calculating streak
  // 1. Get current date
  // 2. Minus one day off the current date and check if habit was completed
  // 3. If true repeat until get to the day habit was initialised

  // const calculateStreak = (completed, createdAt) => {
  //   let streak = 0;
  //   let dateIndex = date;
  //   if (completed) {
  //     if (completed.includes(moment().format('DD-MM-YY'))) {
  //       streak++;
  //     }
  //     while (dateIndex > createdAt) {
  //       dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
  //       if (completed.includes(moment(dateIndex).format('DD-MM-YY'))) {
  //         streak++;
  //       } else {
  //         break;
  //       }
  //     }
  //     return streak;
  //   } else {
  //     return 'Habit not completed yet';
  //   }
  // };

  return (
    <div>
      <h3>{props.habit.name}</h3>
      <button
        onClick={() =>
          startRemoveTask({ id: props.habit.id, habit: props.habit.habit })
        }
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
