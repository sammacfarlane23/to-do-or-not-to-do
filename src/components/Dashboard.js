import React from 'react';
import TaskList from './TaskList';
import AddItem from './AddItem';

export default () => {
  return (
    <div className='dashboard'>
      <TaskList />
      <AddItem />
    </div>
  );
};
