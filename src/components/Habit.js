import React, { useState, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import ItemModal from './ItemModal';
import DeleteModal from './DeleteModal';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';

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
        {props.habit.completed !== undefined ? props.habit.completed.length : 0}{' '}
        total completions
      </p>
      <p className='habit-info'>
        Current Streak:{' '}
        {calculateCurrentStreak(props.habit.completed, props.habit.createdAt)}
      </p>
      <p className='habit-info'>
        Longest Streak:{' '}
        {calculateLongestStreak(props.habit.completed, props.habit.createdAt)}
      </p>
      <p className='habit-info'>
        Habit started on {moment(props.habit.createdAt).format('D MMM YYYY')}
      </p>
      <div className='habit-buttons'>
        <DeleteIcon handleShowDeleteModal={handleShowDeleteModal} />
        <EditIcon handleShowEditModal={handleShowEditModal} />
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
