import { TaskTypeAPI } from "../api/todolist-api";
import { v1 } from "uuid";
import { addTodolistAC, removeTodolistAC, SetTodoListsAC } from "./todolists-reducer";
import { TasksStateType } from "../App";
import { Dispatch } from "redux";
import { todolistAPI } from "../api/todolist-api";
import { accordionActionsClasses } from "@mui/material";

type ActionsType =
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof SetTodoListsAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      return {
        ...state,
        [action.id]: action.tasks,
      };
    }
    case "SET-TODOS": {
      let copyState = { ...state };
      action.todolist.forEach((t) => {
        copyState[t.id] = [];
      });
      return copyState;
    }
    case "REMOVE-TASK": {
         return {...state,[action.todolistId]: state[action.todolistId].filter(t=>t.id !== action.taskId)}
    //   const stateCopy = { ...state };
    //   const tasks = stateCopy[action.todolistId];
    //   const newTasks = tasks.filter((t) => t.id != action.taskId);
    //   stateCopy[action.todolistId] = newTasks;
    //   return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };

      let tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = [...tasks, action.task];
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };
    // {
    //   let todolistTasks = state[action.todolistId];
    //   // найдём нужную таску:
    //   let newTasksArray = todolistTasks.map((t) =>
    //     t.id === action.taskId ? { ...t, title: action.title } : t
    //   );

    //   state[action.todolistId] = newTasksArray;
    //   return { ...state };
    // }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolist.id]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", taskId, todolistId } as const;
};

export const addTaskAC = (task: TaskTypeAPI, todolistId: string) => {
  return { type: "ADD-TASK", task, todolistId } as const;
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId } as const;
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId } as const;
};

export const setTasksAC = (tasks: TaskTypeAPI[], id: string) => {
  return { type: "SET-TASKS", tasks, id } as const;
};

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC(res.data.items, todolistId));
  });
};

export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.createTask(title, todolistId).then((res) => {
    dispatch(addTaskAC(res.data.data.item, todolistId));
  });
};

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, taskId).then((res) => {
    dispatch(removeTaskAC(taskId, todolistId));
  });
};

export const deleteTaskTC1 = ({ todolistId, taskId }: { todolistId: string; taskId: string }) => (
  dispatch: Dispatch
) => {
  todolistAPI.deleteTask(todolistId, taskId).then((res) => {
    dispatch(removeTaskAC(todolistId, taskId));
  });
};
