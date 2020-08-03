import React, { useContext, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const { date, changeDate } = useContext(GlobalContext);
  const [focused, changeFocused] = useState(false);

  const onFocusChange = () => {
    changeFocused(!focused);
  };
  const onDateChange = (date) => {
    changeDate(date);
  };

  return (
    <div className='single-date-picker'>
      <SingleDatePicker
        date={moment(date)}
        onDateChange={onDateChange}
        onFocusChange={onFocusChange}
        focused={focused}
        numberOfMonths={1}
        isOutsideRange={() => false}
        displayFormat='Do MMMM YYYY'
        withPortal={true}
      />
    </div>
  );
};
