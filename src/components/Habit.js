import React, { useState, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import ItemModal from './ItemModal';
import DeleteModal from './DeleteModal';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import PlusIcon from './PlusIcon';

export default (props) => {
  const {
    addHabitToTodoList,
    calculateCurrentStreak,
    calculateLongestStreak,
  } = useContext(GlobalContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleShowEditModal = () => setShowEditModal(true);

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className='habit-tile'>
      <div>
        <h3 className='habit-tile__title'>{props.habit.name}</h3>
        <p className='habit-info'>
          {props.habit.completed !== undefined
            ? props.habit.completed.length
            : 0}{' '}
          total completions
        </p>
        {calculateLongestStreak(
          props.habit.completed,
          props.habit.createdAt
        ) !== 0 && (
          <div>
            <p className='habit-info'>
              Current:{' '}
              {calculateCurrentStreak(
                props.habit.completed,
                props.habit.createdAt
              )}
              🔥
            </p>
            <p className='habit-info'>
              Longest:{' '}
              {calculateLongestStreak(
                props.habit.completed,
                props.habit.createdAt
              )}
              🔥
            </p>
          </div>
        )}
        <p className='habit-info'>
          Habit started on {moment(props.habit.createdAt).format('D MMM YYYY')}
        </p>
      </div>
      <div className='habit-buttons'>
        <DeleteIcon handleShowDeleteModal={handleShowDeleteModal} />
        <EditIcon handleShowEditModal={handleShowEditModal} />
        <button
          className='button--add'
          onClick={() => {
            props.addHabit(props.habit.name, props.habit.id);
          }}
        >
          <PlusIcon />
        </button>
      </div>
      <ItemModal
        showModal={showEditModal}
        closeModal={closeModal}
        task={props.habit}
      />
      <DeleteModal
        showModal={showDeleteModal}
        closeModal={closeModal}
        habit={props.habit}
      />
    </div>
  );
};
