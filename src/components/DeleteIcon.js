import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default (props) => (
  <div>
    <button className='button' onClick={props.handleShowDeleteModal}>
      <FontAwesomeIcon icon={faTrash} className='white-button' size='1x' />
    </button>
  </div>
);
