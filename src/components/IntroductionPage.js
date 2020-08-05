import React from 'react';

export default () => {
  return (
    <div className='introduction-tile'>
      <h1 className='introduction-tile__title'>
        Welcome to
        <br className='show-for-mobile' />
        <span className='introduction-tile__title--white'>
          {' '}
          To-do or Not To-do
        </span>
      </h1>

      <h2 className='introduction-tile__subtitle'>
        A simple app to track your daily habits aswell as keep a to-do list
      </h2>
      <div className='demo-content'>
        <p className='demo-content__text'>
          Inspired by iOS notes. I've used iOS notes with checkboxes as a to-do
          list for some time now and thoughti I would create an app that also
          incorporates habit tracking.
        </p>
        <div className='demo-content__image-border'>
          <img
            className='demo-content__image'
            src='https://s.aolcdn.com/hss/storage/midas/97ca062c75533751eb660de3c4aa9ee9/206475323/Notes%2Bin%2Bdark%2Bmode-ed.jpg'
            width='200'
            height='auto'
          />
        </div>
      </div>
      <a href='#sign-in'>Move down</a>
    </div>
  );
};
