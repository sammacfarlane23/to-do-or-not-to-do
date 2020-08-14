import React from 'react';
import TaskList from './TaskList';
import AddItem from './AddItem';
import DateEdit from './DateEdit';

export default () => {
  return (
    <div className='dashboard'>
      <div>
        <DateEdit />
        <TaskList />
      </div>
      <AddItem showHabitSwitch={true} />
    </div>
  );
};
