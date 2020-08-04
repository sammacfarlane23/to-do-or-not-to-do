import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default (props) => (
  <div>
    <button
      className='button button--show-habits'
      onClick={() => {
        props.handleButtonClick(props.id);
      }}
    >
      <FontAwesomeIcon icon={faPlusCircle} className='white-button' size='2x' />
    </button>
  </div>
);
