import React from 'react';
import ArrowIcon from './ArrowIcon';

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
        A simple app to track your daily habits aswell as keep a to-do list.
        Inspired by iOS notes.
      </h2>
      <div className='demo-content'>
        <p className='demo-content__text'>
          I've used iOS notes as a to-do list (like in the image) for as long as
          I can remember so I've decided to create an app that does this and
          also incorporates habit tracking.
        </p>
        <div className='demo-content__image-border'>
          <img
            src='/images/notes.png'
            className='demo-content__image'
            width='140'
            height='auto'
          />
        </div>
      </div>
      <a href='#sign-in' className='introduction-tile__bottom'>
        <ArrowIcon />
        <p className='introduction-tile__link'>I want to have a go</p>
      </a>
    </div>
  );
};
