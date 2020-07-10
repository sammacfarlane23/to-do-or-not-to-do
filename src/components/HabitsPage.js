import React, { useContext, useState } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import HabitsList from './HabitsList';

export default () => {
  const { startAddHabit } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [createdAt] = useState(moment().startOf('day').valueOf());
  const [completed, setCompleted] = useState([]);

  const addNewHabit = (e) => {
    e.preventDefault();
    startAddHabit({ name, createdAt, completed, habit: true });
    setCompleted([]);
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
