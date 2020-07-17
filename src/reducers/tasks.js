import moment from 'moment';

export default (state, action) => {
  switch (action.type) {
    case 'POPULATE_TASKS':
      return action.tasks;
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, action.habit],
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              ...action.updates,
            };
          } else {
            return task;
          }
        }),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case 'REMOVE_ALL_TASKS':
      return {
        ...state,
        tasks: [],
      };
    case 'REMOVE_HABIT':
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.id),
      };
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
