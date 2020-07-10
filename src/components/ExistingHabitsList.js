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
    <div className='existing-habits'>
      <div className='existing-habits-list'>
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
