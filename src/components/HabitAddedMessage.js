import React from 'react';

export default (props) => {
  return (
    <div>
      <p>
        A new habit (<strong>{props.name}</strong>) has been created.
      </p>
    </div>
  );
};
