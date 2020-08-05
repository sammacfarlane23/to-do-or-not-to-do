import React, { useState, useContext } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { GlobalContext } from '../context/GlobalState';
import HabitAddedMessage from './HabitAddedMessage';

export default (props) => {
  const {
    startAddItemToToDo,
    startAddHabitAndTask,
    addHabitToTodoList,
    dateRef,
    date,
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
        startAddItemToToDo(
          { name, habit, createdAt: date, completed: taskCompleted },
          dateRef
        );
      }
      setHabit(false);
      setName('');
    }
  };

  return (
    <div className='add-item'>
      <div className='habit-message'>
        {!(nameForMessage.length === 0) && (
          <HabitAddedMessage name={nameForMessage} />
        )}
      </div>
      <form onSubmit={addNewTask} className='add-item-form'>
        <div className='text-input-button'>
          <ReactAutocomplete
            inputProps={{ placeholder: placeHolder }}
            className='add-item-name'
            items={habits}
            shouldItemRender={(item, name) =>
              item.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
              name.length > 0 &&
              habit
            }
            getItemValue={(item) => item.name}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? '#eee' : 'transparent',
                }}
                className='text-dropdown'
              >
                {item.name}
              </div>
            )}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onSelect={(name) => setName(name)}
          />
          <button className='button button--add'>Add Item</button>
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
