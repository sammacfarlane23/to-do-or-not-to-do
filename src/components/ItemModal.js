import React from 'react';
import ReactModal from 'react-modal';
import EditForm from './EditForm';

export default (props) => {
  return (
    <ReactModal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      contentLabel='Task Modal'
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      <EditForm task={props.task} closeModal={props.closeModal} />
    </ReactModal>
  );
};
