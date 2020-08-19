import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default () => (
  <div>
    <FontAwesomeIcon
      icon={faAngleDown}
      className='button--arrow button--yellow'
      size='2x'
    />
  </div>
);
