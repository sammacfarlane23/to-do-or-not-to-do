import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const { startRemoveHabit } = useContext(GlobalContext);
  return (
    <ReactModal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      contentLabel='Delete Modal'
      closeTimeoutMS={300}
      ariaHideApp={false}
      className='modal'
    >
      <div className='modal__body'>
        <p>Are you sure you want to delete this habit?</p>
        <div className='habit-buttons'>
          <button
            className='button button--habit'
            onClick={() =>
              startRemoveHabit(props.habit.id, props.habit.createdAt)
            }
          >
            Yes
          </button>
          <button className='button button--habit' onClick={props.closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
