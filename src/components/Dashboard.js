import React from 'react';
import TaskList from './TaskList';
import AddItem from './AddItem';
import ExistingHabitsList from './ExistingHabitsList';

export default () => {
  return (
    <div>
      <ExistingHabitsList />
      <TaskList />
      <AddItem />
    </div>
  );
};
