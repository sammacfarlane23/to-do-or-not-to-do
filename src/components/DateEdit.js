import React, { useContext, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default () => {
  const { date, changeDate } = useContext(GlobalContext);
  const [focused, changeFocused] = useState(false);
  const [datePickerIsOpen, changeDatePickerIsOpen] = useState(false);

  const onFocusChange = () => {
    changeFocused(!focused);
  };
  const onDateChange = (date) => {
    changeDate(date);
  };
  const openDatePicker = () => {
    changeDatePickerIsOpen(!datePickerIsOpen);
  };

  return (
    <div className='date-picker'>
      {/*<SingleDatePicker
        date={moment(date)}
        onDateChange={onDateChange}
        onFocusChange={onFocusChange}
        focused={focused}
        numberOfMonths={1}
        isOutsideRange={() => false}
        displayFormat='Do MMMM YYYY'
        withPortal={true}
        noBorder={true}
        open={datePickerIsOpen}
      />*/}
      <DatePicker
        className='date-picker__button'
        dateFormat={'dd/MM'}
        selected={date}
        onChange={onDateChange}
        onClickOutside={openDatePicker}
        withPortal={true}
      />
      <p className='date-picker__text'>To-do List</p>
    </div>
  );
};
