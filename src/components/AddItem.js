import React, { useState, useContext } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { GlobalContext } from '../context/GlobalState';
import HabitAddedMessage from './HabitAddedMessage';

export default () => {
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
  const [habit, setHabit] = useState(true);
  const [taskCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const addNewTask = (e) => {
    e.preventDefault();

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
    setHabit(true);
    setName('');
    document.getElementById('checkbox').checked = true;
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
            inputProps={{ placeholder: 'Add a new task' }}
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
              >
                {item.name}
              </div>
            )}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onSelect={(name) => setName(name)}
          />
          <button className='add-button'>+</button>
        </div>
        <div className='habit-switch'>
          {habit ? (
            <p className='task-type'>One-off Task</p>
          ) : (
            <p className='task-type'>
              <strong>One-off Task</strong>
            </p>
          )}
          <label className='switch'>
            <input
              id='checkbox'
              type='checkbox'
              className='switch-button'
              onChange={(e) => setHabit(e.target.checked)}
              defaultChecked={true}
            />
            <span className='slider'></span>
          </label>
          {habit ? (
            <p className='task-type'>
              <strong>Habit</strong>
            </p>
          ) : (
            <p className='task-type'>Habit</p>
          )}
        </div>
      </form>
    </div>
  );
};
