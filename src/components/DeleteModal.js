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
    >
      <p>Are you sure you want to delete this habit?</p>
      <button
        onClick={() => startRemoveHabit(props.habit.id, props.habit.createdAt)}
      >
        Yes
      </button>
      <button onClick={props.closeModal}>Cancel</button>
    </ReactModal>
  );
};
