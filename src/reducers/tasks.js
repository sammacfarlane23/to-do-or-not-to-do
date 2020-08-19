import moment from 'moment';

// Only need actions to set tasks and habits and change date
// as tasks and habits state are updated live with a useEffect
// function
export default (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.tasks };
    case 'SET_HABITS':
      return { ...state, habits: action.habits };
    case 'CHANGE_DATE':
      return {
        ...state,
        date: moment(action.date).valueOf(),
        dateRef: moment(action.date).format('DD-MM-YY'),
      };
    default:
      return state;
  }
};
