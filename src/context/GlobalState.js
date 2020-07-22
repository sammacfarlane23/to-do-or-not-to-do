import React, { createContext, useReducer, useContext } from 'react';
import moment from 'moment';
import TasksReducer from '../reducers/tasks';
import database from '../firebase/firebase';
import { UserContext } from './UserProvider';

const initialTaskState = {
  date: moment().startOf('day').valueOf(),
  dateRef: moment().format('DD-MM-YY'),
  tasks: [],
  habits: [],
};

export const GlobalContext = createContext(initialTaskState);
export const GlobalProvider = ({ children }) => {
  const [taskState, taskDispatch] = useReducer(TasksReducer, initialTaskState);
  const user = useContext(UserContext);

  const addTask = (task) => {
    taskDispatch({
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
        .ref(`${user.uid}/tasks/${dateRef}`)
        .child(`${id}`)
        .set(task)
        .then(() => {
          addTask({
            ...task,
          });
        });
    } else {
      database
        .ref(`${user.uid}/tasks/${dateRef}`)
        .push(task)
        .then(() => {
          addTask({
            ...task,
          });
        });
    }
  };

  const addHabit = (habit) => {
    taskDispatch({
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
      .ref(`${user.uid}/habits`)
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

    // This may not still work
    const key = database.ref(user.uid).push().key;

    database
      .ref(`${user.uid}/tasks/${dateRef}`)
      .child(`${key}`)
      .set(newHabit)
      .then(() => {
        addTask({
          ...newHabit,
        });
      });

    database
      .ref(`${user.uid}/habits`)
      .child(`${key}`)
      .set(newHabit)
      .then(() => {
        addHabit({
          ...newHabit,
        });
      });
  };

  const removeTask = (id) => {
    taskDispatch({
      type: 'REMOVE_TASK',
      id,
    });
  };

  // Can use this function to only delete a habit from today's list by not passing in the habit property
  const startRemoveTask = ({ id, habit } = {}, dateRef) => {
    if (habit) {
      database
        .ref(`${user.uid}/habits/${id}`)
        .remove()
        .then(() => removeTask(id));
    } else {
      const completedArray = [];
      database
        .ref(`${user.uid}/habits/${id}/completed`)
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val() !== dateRef) {
              completedArray.push(childSnapshot.val());
            }
          });
        })
        .then(() => {
          database
            .ref(`${user.uid}/habits/${id}/completed`)
            .set(completedArray);
        })
        .then(() => database.ref(`${user.uid}/tasks/${dateRef}/${id}`).remove())
        .then(() => removeTask(id));
    }
  };

  const removeAllTasks = () => {
    taskDispatch({
      type: 'REMOVE_ALL_TASKS',
    });
  };

  const startRemoveAllTasks = (tasks, dateRef) => {
    tasks.forEach((task) => {
      // By running this function and not passing in the habit property it only deletes today's instance
      startRemoveTask({ id: task.id }, dateRef);
    });
    removeAllTasks();
  };

  const removeHabit = (id) => {
    taskDispatch({
      type: 'REMOVE_HABIT',
      id,
    });
  };

  const startRemoveHabit = (id, createdAt) => {
    // Remove from habits section of database first
    database
      .ref(`${user.uid}/habits/${id}`)
      .remove()
      .then(() => removeHabit(id));

    // Next remove all instances of this habit on to-do lists
    let dateIndex = moment().valueOf();
    while (dateIndex > createdAt) {
      let hasTask = false;
      const date = moment(dateIndex).format('DD-MM-YY');
      var ref = database.ref(`${user.uid}/tasks/${date}`);
      ref
        .once('value')
        .then((snapshot) => {
          hasTask = snapshot.hasChild(`${id}`);
        })
        .then(() => {
          if (hasTask) {
            database
              .ref(`${user.uid}/tasks/${date}/${id}`)
              .remove()
              .then(() => {
                if (taskState.dateRef === date) {
                  removeTask(id);
                }
              });
          }
        });
      dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
    }
  };

  const editTask = (id, updates) => {
    taskDispatch({
      type: 'EDIT_TASK',
      id,
      updates,
    });
  };

  const startEditTask = (id, updates, dateRef) => {
    database
      .ref(`${user.uid}/tasks/${dateRef}/${id}`)
      .update(updates)
      .then(() => editTask(id, updates));
  };

  const editHabit = (id, updates) => {
    taskDispatch({
      type: 'EDIT_HABIT',
      id,
      updates,
    });
  };

  const startEditHabit = (id, updates, createdAt) => {
    database
      .ref(`${user.uid}/habits/${id}`)
      .update(updates)
      .then(() => editHabit(id, updates));

    // Check if a day has the task and if it does, edit it
    // Should probably abstract this into a function as it's used more than once
    let dateIndex = moment().valueOf();
    while (dateIndex > createdAt) {
      let hasTask = false;
      const date = moment(dateIndex).format('DD-MM-YY');
      var ref = database.ref(`${user.uid}/tasks/${date}`);
      ref
        .once('value')
        .then((snapshot) => {
          hasTask = snapshot.hasChild(`${id}`);
        })
        .then(() => {
          if (hasTask) {
            database
              .ref(`${user.uid}/tasks/${date}/${id}`)
              .update(updates)
              .then(() => editHabit(id, updates));
          }
        });
      dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
    }
  };

  const startCompleteHabit = (id, dateRef) => {
    const completedArray = [];
    database
      .ref(`${user.uid}/habits/${id}/completed`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          completedArray.push(childSnapshot.val());
        });
        completedArray.push(dateRef);
      })
      .then(() => {
        database
          .ref(`${user.uid}/tasks/${dateRef}/${id}/completed`)
          .set(completedArray);
        database.ref(`${user.uid}/habits/${id}/completed`).set(completedArray);
      });
  };

  const startUndoCompleteHabit = (id, dateRef) => {
    const completedArray = [];
    database
      .ref(`${user.uid}/habits/${id}/completed`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val() !== dateRef) {
            completedArray.push(childSnapshot.val());
          }
        });
      })
      .then(() => {
        database
          .ref(`${user.uid}/tasks/${dateRef}/${id}/completed`)
          .set(completedArray);
        database.ref(`${user.uid}/habits/${id}/completed`).set(completedArray);
      });
  };

  const setTasks = (tasks) => {
    taskDispatch({
      type: 'SET_TASKS',
      tasks,
    });
  };

  const startSetTasks = (dateRef) => {
    database
      .ref(`${user.uid}/tasks/${dateRef}`)
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
    taskDispatch({
      type: 'SET_HABITS',
      habits,
    });
  };

  const startSetHabits = () => {
    database
      .ref(`${user.uid}/habits/`)
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
      .ref(`${user.uid}/habits/${id}`)
      .once('value')
      .then((snapshot) => {
        habit = snapshot.val();
        startAddItemToToDo(habit, taskState.dateRef, id);
      });
  };

  const changeDate = (date) => {
    taskDispatch({
      type: 'CHANGE_DATE',
      date,
    });
  };

  const calculateCurrentStreak = (completed, createdAt) => {
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

  const calculateLongestStreak = (completed, createdAt) => {
    let streak = 0;
    const streaks = [];
    const dateIndex = moment().valueOf();
    let startDate = createdAt;

    // if habit has been completed
    if (completed) {
      // Check if completed each day between habit creation date and today
      while (startDate <= dateIndex) {
        // If habit has not been completed on a day and there
        // is a streak add it to the array of streaks and reset streak
        if (!completed.includes(moment(startDate).format('DD-MM-YY'))) {
          if (streak !== 0) {
            streaks.push(streak);
          }
          streak = 0;

          // If it has been completed increment the streak
        } else {
          streak++;
        }

        // Increment day by one
        startDate = moment(startDate).add(1, 'day').valueOf();
      }

      // Add any streaks running up to the current day to the array
      streaks.push(streak);

      // Return the largest streak in the streaks array
      return Math.max(...streaks);
    } else {
      return streak;
    }
  };

  // Check if a given habit or task has been completed today
  const isCompleteToday = (task, dateRef) => {
    let completedToday;
    if (task.completed) {
      if (task.habit) {
        task.completed.forEach((date) => {
          if (date === dateRef) {
            completedToday = true;
          } else completedToday = false;
        });
      } else {
        completedToday = task.completed;
      }
    } else {
      completedToday = false;
    }
    return completedToday;
  };

  // Sort tasks by whether they have been completed today or not
  const sortTasks = (a, b) => {
    const aCompleteToday = isCompleteToday(a, taskState.dateRef);
    const bCompleteToday = isCompleteToday(b, taskState.dateRef);

    if (!aCompleteToday && bCompleteToday) {
      return -1;
    } else if (aCompleteToday && !bCompleteToday) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        dateRef: taskState.dateRef,
        date: taskState.date,
        tasks: taskState.tasks,
        habits: taskState.habits,
        addHabitToTodoList,
        startAddItemToToDo,
        startAddHabit,
        startAddHabitAndTask,
        startRemoveTask,
        startRemoveAllTasks,
        startRemoveHabit,
        startEditTask,
        startEditHabit,
        startCompleteHabit,
        startUndoCompleteHabit,
        startSetTasks,
        startSetHabits,
        changeDate,
        calculateCurrentStreak,
        calculateLongestStreak,
        sortTasks,
        isCompleteToday,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
