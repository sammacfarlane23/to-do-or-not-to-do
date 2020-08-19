import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Habit from './Habit';
import { GlobalContext } from '../context/GlobalState';
import LoadingPage from './LoadingPage';

export default () => {
  const {
    addHabitToTodoList,
    startSetHabits,
    tasks,
    habits,
    date,
  } = useContext(GlobalContext);
  const [renderList, setRenderList] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');

  const addHabitToTodo = (name, id) => {
    addHabitToTodoList(id);
    const dateFormatted = moment(date).format('DD/MM');
    let existsInTodoList = false;
    tasks.forEach((task) => {
      if (task.name === name) {
        existsInTodoList = true;
      }
    });
    if (!existsInTodoList) {
      setAddedMessage(`${name} was added to ${dateFormatted} to-do list`);
    } else {
      setAddedMessage(`${name} is already on ${dateFormatted} to-do list`);
    }
    setTimeout(() => {
      setAddedMessage('');
    }, 2000);
  };

  // This useEffect function with the habits dependency means
  // that the startAddHabit function does not have to update the
  // state as the state will be updated automatically here

  useEffect(() => {
    startSetHabits();
    setRenderList(true);
  }, [habits]);

  return renderList ? (
    <div className='habit-container'>
      {addedMessage.length > 0 && (
        <p className='habit-list__message'>{addedMessage}</p>
      )}
      <div className='habits-list'>
        {habits.map((habit) => {
          // The message is triggered when a new habit or task is added
          // When added, id also prints as undefined
          // When first added new habit does not have an id,
          // upon refresh it has one
          // Habit being printed here does not match habit in database
          // Fixed by adding to an id to the state version of habit
          return (
            <Habit key={habit.id} habit={habit} addHabit={addHabitToTodo} />
          );
        })}
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};
