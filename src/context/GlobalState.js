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
  loaded: false,
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
    const habitObject = {
      name,
      createdAt,
      habit,
    };

    // If it is a habit its id will have been passed in to use again here
    if (id) {
      database
        .ref(`users/${user.uid}/tasks/${dateRef}`)
        .child(`${id}`)
        .set(habitObject)
        .then(() => {
          addTask({
            id,
            ...habitObject,
          });
        });
    } else {
      database
        .ref(`users/${user.uid}/tasks/${dateRef}`)
        .push(task)
        .then((ref) => {
          addTask({
            id: ref.key,
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
    const { name = '', createdAt = 0, habit = true } = habitData;
    const newHabit = {
      name,
      createdAt,
      habit,
    };

    database
      .ref(`users/${user.uid}/habits`)
      .push(newHabit)
      .then((ref) => {
        addHabit({
          id: ref.key,
          ...newHabit,
        });
      });

    // database
    //   .ref(`users/${user.uid}/tasks/${dateRef}`)
    //   .push(task)
    //   .then((ref) => {
    //     addTask({
    //       id: ref.key,
    //       ...task,
    //     });
    //   });
  };

  const startAddHabitAndTask = (habitData = {}, dateRef) => {
    const { name = '', createdAt = 0, habit = true } = habitData;
    const newHabit = {
      name,
      createdAt,
      habit,
    };

    const key = database.ref(user.uid).push().key;

    database
      .ref(`users/${user.uid}/tasks/${dateRef}`)
      .child(`${key}`)
      .set(newHabit)
      .then(() => {
        addTask({
          id: key,
          ...newHabit,
        });
      });

    database
      .ref(`users/${user.uid}/habits`)
      .child(`${key}`)
      .set(newHabit)
      .then(() => {
        addHabit({
          id: key,
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

  const startRemoveTask = ({ id, createdAt } = {}, dateRef) => {
    // If it's a habit undo its completion today since it is getting removed
    startUndoCompleteHabit(id, createdAt, dateRef, true);
    database
      .ref(`users/${user.uid}/tasks/${dateRef}/${id}`)
      .remove()
      .then(() => {
        removeTask(id);
      });
  };

  const startRemoveAllTasks = (tasks, dateRef) => {
    // For each task on today's todo list run the startRemoveTask function from above
    tasks.forEach((task) => {
      startRemoveTask({ id: task.id, createdAt: task.createdAt }, dateRef);
    });
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
      .ref(`users/${user.uid}/habits/${id}`)
      .remove()
      .then(() => {
        removeHabit(id);
      });

    // Next remove all instances of this habit on to-do lists
    let dateIndex = moment().valueOf();
    while (dateIndex > createdAt) {
      const date = moment(dateIndex).format('DD-MM-YY');
      // Go through each day since createdAt and check if todo list contains habit
      database
        .ref(`users/${user.uid}/tasks/${date}`)
        .once('value')
        .then((snapshot) => {
          return snapshot.hasChild(`${id}`);
        })
        // If a todo list contains the habit remove it
        .then((hasTask) => {
          if (hasTask) {
            database.ref(`users/${user.uid}/tasks/${date}/${id}`).remove();
          }
        })
        // If habit is on today's todo list remove it
        .then(() => {
          if (taskState.dateRef === date) {
            removeTask(id);
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
      .ref(`users/${user.uid}/tasks/${dateRef}/${id}`)
      .update(updates)
      .then(() => {
        editTask(id, updates);
      });
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
      .ref(`users/${user.uid}/habits/${id}`)
      .update(updates)
      .then(() => {
        editHabit(id, updates);
      });

    // Check if a day has the task and if it does, edit it
    // Should probably abstract this into a function as it's used more than once
    let dateIndex = moment().valueOf();
    while (dateIndex > createdAt) {
      const date = moment(dateIndex).format('DD-MM-YY');
      database
        .ref(`users/${user.uid}/tasks/${date}`)
        .once('value')
        .then((snapshot) => {
          return snapshot.hasChild(`${id}`);
        })
        .then((hasTask) => {
          if (hasTask) {
            database
              .ref(`users/${user.uid}/tasks/${date}/${id}`)
              .update(updates);
          }
          return hasTask;
        })
        .then((hasTask) => {
          if (hasTask) {
            editHabit(id, updates);
          }
        });
      dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
    }
  };

  const startCompleteHabit = (id, createdAt, dateRef) => {
    const completedArray = [];
    // Get each date in the completedArray
    database
      .ref(`users/${user.uid}/habits/${id}/completed`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          completedArray.push(childSnapshot.val());
        });
        completedArray.push(dateRef);
      })
      .then(() => {
        database
          .ref(`users/${user.uid}/tasks/${dateRef}/${id}/completed`)
          .set(completedArray);
      })
      .then(() => {
        database
          .ref(`users/${user.uid}/habits/${id}/completed`)
          .set(completedArray);
      });

    // Update completed array for all instances of habit
    updateCompletedArray(completedArray, id, createdAt);
  };

  const startUndoCompleteHabit = (id, createdAt, dateRef, removing) => {
    const completedArray = [];
    database
      .ref(`users/${user.uid}/habits/${id}/completed`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val() !== dateRef) {
            completedArray.push(childSnapshot.val());
          }
        });
      })
      .then(() => {
        // If this is a removal of the task from today's list don't updates today's completed array
        if (!removing) {
          database
            .ref(`users/${user.uid}/tasks/${dateRef}/${id}/completed`)
            .set(completedArray);
        }
      })
      .then(() => {
        database
          .ref(`users/${user.uid}/habits/${id}/completed`)
          .set(completedArray);
      });

    // Update completed array for all instances of habit
    updateCompletedArray(completedArray, id, createdAt);
  };

  const updateCompletedArray = (completedArray, id, createdAt) => {
    let dateIndex = moment().valueOf();
    while (dateIndex > createdAt) {
      const date = moment(dateIndex).format('DD-MM-YY');
      database
        .ref(`users/${user.uid}/tasks/${date}`)
        .once('value')
        .then((snapshot) => {
          return snapshot.hasChild(`${id}`);
        })
        .then((hasTask) => {
          if (hasTask) {
            database
              .ref(`users/${user.uid}/tasks/${date}/${id}/completed`)
              .set(completedArray);
          }
        });
      dateIndex = moment(dateIndex).subtract(1, 'day').valueOf();
    }
  };

  const setTasks = (tasks) => {
    taskDispatch({
      type: 'SET_TASKS',
      tasks,
    });
  };

  const startSetTasks = (dateRef) => {
    database
      .ref(`users/${user.uid}/tasks/${dateRef}`)
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
      .ref(`users/${user.uid}/habits`)
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
    database
      .ref(`users/${user.uid}/habits/${id}`)
      .once('value')
      .then((snapshot) => {
        const habit = snapshot.val();
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
    // If habit has been completed
    if (completed) {
      // If one of those days completed is today, increment streak
      if (completed.includes(moment().format('DD-MM-YY'))) {
        streak++;
      }
      // Check rest of days all the way to habit creation
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
    let completedToday = false;
    if (task.completed) {
      if (task.habit) {
        task.completed.forEach((date) => {
          if (date === dateRef) {
            completedToday = true;
          }
        });
      } else {
        completedToday = task.completed;
      }
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
