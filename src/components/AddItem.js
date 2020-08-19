import React, { useState, useContext } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { GlobalContext } from '../context/GlobalState';
import HabitAddedMessage from './HabitAddedMessage';
import PlusIcon from './PlusIcon';

export default (props) => {
  const {
    startAddTask,
    startAddHabit,
    startAddHabitAndTask,
    addHabitToTodoList,
    dateRef,
    date,
    tasks,
    habits,
  } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [nameForMessage, setNameForMessage] = useState('');
  const [habit, setHabit] = useState(!props.showHabitSwitch);
  const [taskCompleted] = useState(false);

  const placeHolder = habit ? 'Add a new habit' : 'Add a new task';

  const addNewTask = (e) => {
    e.preventDefault();

    if (name.length > 0) {
      // If an item is added from the habit page, just add the habit, not to-do aswell
      if (!props.showHabitSwitch) {
        startAddHabit({ name, habit, createdAt: date });
        setName('');
      } else {
        if (habit) {
          let exists = false;
          let id;
          // Check if the typed habit already exists
          habits.forEach((habit) => {
            if (name === habit.name) {
              exists = true;
              id = habit.id;
            }
          });
          // If habit already exists add it to today's todo list and if not create a new one and add it
          if (exists) {
            addHabitToTodoList(id);
          } else {
            startAddHabitAndTask({ name, habit, createdAt: date }, dateRef);
            setNameForMessage(name);
          }

          setName('');
          const timer = setTimeout(() => {
            setNameForMessage('');
          }, 2000);
          return () => clearTimeout(timer);
        } else {
          startAddTask({
            name,
            createdAt: date,
            habit,
            completed: taskCompleted,
          });
        }
        setHabit(false);
        setName('');
      }
    }
  };

  return (
    <div>
      <div className='habit-message'>
        {!(nameForMessage.length === 0) && (
          <HabitAddedMessage name={nameForMessage} />
        )}
      </div>
      <form onSubmit={addNewTask} className='add-item__form'>
        <div className='text-input-button'>
          <input
            type='text'
            placeholder={placeHolder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='button--add'>
            <PlusIcon />
          </button>
        </div>

        {props.showHabitSwitch &&
          (habit ? (
            <div className='habit-switch'>
              <button className='button button--selected' type='button'>
                Daily Habit
              </button>
              <button
                className='button button--switch'
                type='button'
                onClick={() => setHabit(!habit)}
              >
                One-off Task
              </button>
            </div>
          ) : (
            <div className='habit-switch'>
              <button
                className='button button--switch'
                type='button'
                onClick={() => setHabit(!habit)}
              >
                Daily Habit
              </button>
              <button className='button button--selected' type='button'>
                One-off Task
              </button>
            </div>
          ))}
      </form>
    </div>
  );
};
