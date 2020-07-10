import React, { createContext, useReducer } from 'react';
import moment from 'moment';
import TasksReducer from '../reducers/tasks';
import database from '../firebase/firebase';

const initialState = {
  date: moment().valueOf(),
  dateRef: moment().format('DD-MM-YY'),
  tasks: [],
  habits: [],
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const addTask = (task) => {
    dispatch({
      type: 'ADD_TASK',
      task,
    });
  };

  const startAddItemToToDo = (taskData = {}, dateRef, id) => {
    const {
      name = '',
      createdAt = 0,
      habit = false,
      completed = false,
    } = taskData;
    const task = {
      name,
      createdAt,
      habit,
      completed,
    };

    if (id) {
      database
        .ref(`/tasks/${dateRef}`)
        .child(`${id}`)
        .set(task)
        .then(() => {
          addTask({
            ...task,
          });
        });
    } else {
      database
        .ref(`/tasks/${dateRef}`)
        .push(task)
        .then(() => {
          addTask({
            ...task,
          });
        });
    }
  };

  const addHabit = (habit) => {
    dispatch({
      type: 'ADD_HABIT',
      habit,
    });
  };

  const startAddHabit = (habitData = {}) => {
    const {
      name = '',
      createdAt = 0,
      habit = true,
      completed = false,
    } = habitData;
    const newHabit = {
      name,
      createdAt,
      habit,
      completed,
    };

    database
      .ref(`/habits`)
      .push(newHabit)
      .then(() => {
        addHabit({
          ...newHabit,
        });
      });
  };

  const startAddHabitAndTask = (habitData = {}, dateRef) => {
    const { name = '', createdAt = 0, habit = true } = habitData;
    const newHabit = {
      name,
      createdAt,
      habit,
    };

    const key = database.ref().push().key;

    database
      .ref(`/tasks/${dateRef}`)
      .child(`${key}`)
      .set(newHabit)
      .then(() => {
        addTask({
          ...newHabit,
        });
      });

    database
      .ref('/habits')
      .child(`${key}`)
      .set(newHabit)
      .then(() => {
        addHabit({
          ...newHabit,
        });
      });
  };

  const removeTask = (id) => {
    dispatch({
      type: 'REMOVE_TASK',
      id,
    });
  };

  const startRemoveTask = ({ id, habit } = {}, dateRef) => {
    if (habit) {
      database
        .ref(`habits/${id}`)
        .remove()
        .then(() => removeTask(id));
      // Need to make this remove every instance of the habit
      // 1. Get every instance of it
      // 2. Remove each instance
      //database.ref(`tasks/${dateRef}/${id}`).remove();
    } else {
      const completedArray = [];
      database
        .ref(`/habits/${id}/completed`)
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val() !== dateRef) {
              completedArray.push(childSnapshot.val());
            }
          });
        })
        .then(() => {
          database.ref(`habits/${id}/completed`).set(completedArray);
        })
        .then(() => database.ref(`tasks/${dateRef}/${id}`).remove())
        .then(() => removeTask(id));
    }
  };

  const removeHabit = (id) => {
    dispatch({
      type: 'REMOVE_HABIT',
      id,
    });
  };

  const startRemoveHabit = (id, createdAt) => {
    // Remove from habits section of database first
    database
      .ref(`habits/${id}`)
      .remove()
      .then(() => removeHabit(id));

    // Next remove all instances of this habit on to-do lists
    let dateIndex = moment().valueOf();
    while (dateIndex > createdAt) {
      let hasTask = false;
      const date = moment(dateIndex).format('DD-MM-YY');
      console.log(date);
      var ref = database.ref(`tasks/${date}`);
      ref
        .once('value')
        .then((snapshot) => {
          hasTask = snapshot.hasChild(`${id}`);
        })
        .then(() => {
          if (hasTask) {
            database
              .ref(`tasks/${date}/${id}`)
              .remove()
              .then(() => {
                if (state.dateRef === date) {
                  removeTask(id);
                }
              });
          }
        });
      dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
    }
  };

  const editTask = (id, updates) => {
    dispatch({
      type: 'EDIT_TASK',
      id,
      updates,
    });
  };

  const startEditTask = (id, updates, dateRef) => {
    database
      .ref(`tasks/${dateRef}/${id}`)
      .update(updates)
      .then(() => editTask(id, updates));
  };

  const completeHabit = (id, updates, dateRef) => {
    dispatch({
      type: 'COMPLETE_HABIT',
      id,
      updates,
      dateRef,
    });
  };

  const startCompleteHabit = (id, dateRef) => {
    const completedArray = [];
    database
      .ref(`/habits/${id}/completed`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          completedArray.push(childSnapshot.val());
        });
        completedArray.push(dateRef);
      })
      .then(() => {
        database.ref(`tasks/${dateRef}/${id}/completed`).set(completedArray);
        database.ref(`habits/${id}/completed`).set(completedArray);
      });
  };

  const startUndoCompleteHabit = (id, dateRef) => {
    const completedArray = [];
    database
      .ref(`/habits/${id}/completed`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val() !== dateRef) {
            completedArray.push(childSnapshot.val());
          }
        });
      })
      .then(() => {
        database.ref(`tasks/${dateRef}/${id}/completed`).set(completedArray);
        database.ref(`habits/${id}/completed`).set(completedArray);
      });
  };

  const setTasks = (tasks) => {
    dispatch({
      type: 'SET_TASKS',
      tasks,
    });
  };

  const startSetTasks = (dateRef) => {
    database
      .ref(`/tasks/${dateRef}`)
      .once('value')
      .then((snapshot) => {
        const tasks = [];
        snapshot.forEach((childSnapshot) => {
          tasks.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setTasks(tasks);
      });
  };

  const setHabits = (habits) => {
    dispatch({
      type: 'SET_HABITS',
      habits,
    });
  };

  const startSetHabits = () => {
    database
      .ref(`/habits/`)
      .once('value')
      .then((snapshot) => {
        const habits = [];
        snapshot.forEach((childSnapshot) => {
          habits.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setHabits(habits);
      });
  };

  const addHabitToTodoList = (id) => {
    let habit;
    database
      .ref(`/habits/${id}`)
      .once('value')
      .then((snapshot) => {
        habit = snapshot.val();
        startAddItemToToDo(habit, state.dateRef, id);
      });
  };

  const changeDate = (date) => {
    dispatch({
      type: 'CHANGE_DATE',
      date,
    });
  };

  const calculateStreak = (completed, createdAt) => {
    let streak = 0;
    let dateIndex = moment().valueOf();
    if (completed) {
      if (completed.includes(moment().format('DD-MM-YY'))) {
        streak++;
      }
      while (dateIndex > createdAt) {
        dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
        if (completed.includes(moment(dateIndex).format('DD-MM-YY'))) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    } else {
      return streak;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        dateRef: state.dateRef,
        date: state.date,
        tasks: state.tasks,
        habits: state.habits,
        addHabitToTodoList,
        startAddItemToToDo,
        startAddHabit,
        startAddHabitAndTask,
        startRemoveTask,
        startRemoveHabit,
        startEditTask,
        startCompleteHabit,
        startUndoCompleteHabit,
        startSetTasks,
        startSetHabits,
        changeDate,
        calculateStreak,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
