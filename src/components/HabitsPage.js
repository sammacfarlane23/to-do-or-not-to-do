import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import HabitsList from './HabitsList';

export default () => {
  const { startAddHabit, date } = useContext(GlobalContext);
  const [name, setName] = useState('');

  const addNewHabit = (e) => {
    e.preventDefault();
    startAddHabit({ name, createdAt: date, habit: true });
    setName('');
  };

  return (
    <div className='habits-page'>
      <h1 className='habits-page-title'>My Habits</h1>
      <HabitsList />
      <form onSubmit={addNewHabit} className='add-item-form'>
        <div>
          <input
            type='text'
            placeholder='Enter a new habit'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Add Item</button>
        </div>
      </form>
    </div>
  );
};
