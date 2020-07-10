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
  }, [habits, startSetHabits]);

  const addHabitToday = (id) => {
    addHabitToTodoList(id);
  };

  return (
    <div>
      <h3>Daily Habits (click to add to to-do list)</h3>
      <div className='existing-habits'>
        {habits.map((habit) => (
          <div className='existing-habit-tile' key={habit.id}>
            <p className='habit-title'>
              <strong>{habit.name}</strong>
            </p>
            {calculateStreak(habit.completed, habit.createdAt) === 0 || (
              <p className='habit-streak'>
                {calculateStreak(habit.completed, habit.createdAt)}🔥
              </p>
            )}
            <button
              className='add-button'
              onClick={() => addHabitToday(habit.id)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
