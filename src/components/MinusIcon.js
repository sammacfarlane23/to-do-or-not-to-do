import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default (props) => (
  <div>
    <button
      className='button button--show-habits'
      onClick={() => {
        props.handleButtonClick();
      }}
    >
      <FontAwesomeIcon
        icon={faMinusCircle}
        className='white-button'
        size='2x'
      />
    </button>
  </div>
);
