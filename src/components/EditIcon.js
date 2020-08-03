import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default (props) => (
  <div>
    <button className='button' onClick={props.handleShowEditModal}>
      <FontAwesomeIcon icon={faEdit} className='white-button' size='2x' />
    </button>
  </div>
);
