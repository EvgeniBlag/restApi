import axios, { AxiosResponse } from 'axios'
import { type } from 'os';


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {'API-KEY': 'e0e4e810-bd22-453d-b719-7a96986531e7',},
  });


  export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
  };

  export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskTypeAPI[]
  }

  export type CreateTaskResponse = {
    error: string | null;
    totalCount: number;
    item: TaskTypeAPI
  };

  export type TaskTypeAPI = {
    description: string;
    title: string;
    completed: boolean;
    status: TaskStatuses;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
  };

 export type ResponseType <T={}> = {
  data:T,
  messages: string[],
  fieldsErrors:string[],
  resultCode:number
 };

 export type DeleteResponseType <T={}> = {
  data:T,
  messages: string[],
  resultCode:number
 };

 export type AddTaskType <T={}> = {
  data: T,
  messages: string[],
  resultCode: number,
  item: TaskTypeAPI
 };

export type UpdateTaskModelType = {
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatuses;
  priority: number;
  startDate: string;
  deadline: string;
};

//Chekbox
 export enum TaskStatuses {
  New = 0,//False
  InProgress = 1,
  Completed = 2,//True
  Draft = 3
};


 
 

export const todolistAPI = {
 
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },

  createTodolist(title:string) {
    return instance.post <ResponseType<{item:TodolistType}>> ('todo-lists', {title:'Evgeny and Aria y Uliana'});
},

  deleteTodolist(todolistId:string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`); 
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`,{ title: title });
  },

  getTasks(todolistId:string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`); 
  },

  createTask(title:string, todolistId:string) {
    return instance.post<ResponseType<CreateTaskResponse>>(`/todo-lists/${todolistId}/tasks`, {title}); 
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<DeleteResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },

  updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType) {
    return instance.put<UpdateTaskModelType,AxiosResponse<ResponseType<{item:TaskTypeAPI }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`,model);
  },
};









