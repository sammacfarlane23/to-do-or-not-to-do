import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { habits, addHabitToTodoList, startSetHabits } = useContext(
    GlobalContext
  );

  useEffect(() => {
    startSetHabits();
  }, [habits]);

  const addHabitToday = (id) => {
    addHabitToTodoList(id);
  };

  return (
    <div>
      {habits.map((habit) => (
        <div>
          <p>{habit.name}</p>
          <button onClick={() => addHabitToday(habit.id)}>+</button>
        </div>
      ))}
    </div>
  );
};
