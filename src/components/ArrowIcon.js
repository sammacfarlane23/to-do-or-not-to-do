import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

export default (props) => (
  <div>
    <FontAwesomeIcon
      icon={faArrowAltCircleDown}
      className='button--down'
      size='2x'
    />
  </div>
);
