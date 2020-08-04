import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import AddHabitsPlusIcon from './AddHabitsPlusIcon';

export default () => {
  const {
    habits,
    addHabitToTodoList,
    startSetHabits,
    calculateCurrentStreak,
    date,
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
        {habits
          .filter((habit) => habit.createdAt <= date)
          .map((habit) => (
            <div className='existing-habit-tile' key={habit.id}>
              <p className='habit-title'>
                <strong>{habit.name}</strong>
              </p>
              {calculateCurrentStreak(habit.completed, habit.createdAt) ===
                0 || (
                <p className='habit-streak'>
                  {calculateCurrentStreak(habit.completed, habit.createdAt)}🔥
                </p>
              )}
              <AddHabitsPlusIcon
                handleButtonClick={addHabitToday}
                id={habit.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
