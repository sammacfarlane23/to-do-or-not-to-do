import React, { useContext } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import randomColor from 'randomcolor';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { habits, calculateCurrentStreak } = useContext(GlobalContext);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    spacing: 10,
    slidesPerView: 10,
    centered: true,
    mode: 'free',
  });

  return (
    // Try infinite slider
    <div ref={sliderRef} className='keen-slider'>
      {habits.map((habit) => {
        const num = habits.indexOf(habit) + 1;
        return (
          <div
            className='keen-slider__slide endless-slide'
            style={{
              backgroundColor: randomColor({
                seed: Math.abs(num),
                luminosity: 'light',
              }),
            }}
          >
            <p>{habit.name}</p>
            <p>{calculateCurrentStreak(habit.completed, habit.createdAt)}</p>
            <button>+</button>
          </div>
        );
      })}
    </div>
  );
};
