import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const {
    habits,
    addHabitToTodoList,
    startSetHabits,
    calculateStreak,
  } = useContext(GlobalContext);

  useEffect(() => {
    startSetHabits();
  }, [habits]);

  const addHabitToday = (id) => {
    addHabitToTodoList(id);
  };

  return (
    <div>
      <h3>Daily Habits (click to add to to-do list)</h3>
      <div className='existing-habits'>
        {habits.map((habit) => (
          <div className='existing-habit-tile'>
            <p>
              <strong>{habit.name}</strong>
            </p>
            <p>{calculateStreak(habit.completed, habit.createdAt)}</p>
            <button onClick={() => addHabitToday(habit.id)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
};
