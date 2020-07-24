import React, { useState, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import ItemModal from './ItemModal';
import DeleteModal from './DeleteModal';

export default (props) => {
  const { calculateCurrentStreak, calculateLongestStreak } = useContext(
    GlobalContext
  );

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
      <h3 className='habit-title'>{props.habit.name}</h3>
      <p className='habit-info'>
        Habit since: {moment(props.habit.createdAt).format('DD/MM/YY')}
      </p>
      {props.habit.completed ? (
        <p className='habit-info'>
          {props.habit.completed.length} total completions
        </p>
      ) : (
        <p className='habit-info'>Habit not yet completed</p>
      )}
      <p className='habit-info'>
        Current Streak:{' '}
        {calculateCurrentStreak(props.habit.completed, props.habit.createdAt)}{' '}
        days
      </p>
      <p className='habit-info'>
        Longest Streak:{' '}
        {calculateLongestStreak(props.habit.completed, props.habit.createdAt)}
      </p>
      <p className='habit-info'>
        Habit started {moment(props.habit.createdAt).fromNow()}
      </p>
      <button onClick={handleShowDeleteModal}>x</button>
      <button onClick={handleShowEditModal}>Edit</button>
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
