import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default () => {
  const [sliderRef, slider] = useKeenSlider({ loop: true, spacing: 10 });

  return (
    <div ref={sliderRef} className='keen-slider'>
      <div className='keen-slider__slide number-slide1'>One-Off Task</div>
      <div className='keen-slider__slide number-slide2'>Habit</div>
    </div>
  );
};
