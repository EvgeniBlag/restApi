import { Dispatch } from 'redux';
import { todolistAPI, TodolistType } from '../api/todolist-api';


 type ActionsType =
   | ReturnType<typeof SetTodoListsAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>;

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all'|'active'|'complited';
export type TodolistDomainType = TodolistType & {filter:FilterValuesType};

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

      case "SET-TODOS": {
        return action.todolist.map(t=>({...t,filter:'all'}))
      }
      case "REMOVE-TODOLIST": {
        return state.filter((tl) => tl.id !== action.id);
      }
      case "ADD-TODOLIST": {
        const newTodolist : TodolistDomainType = {...action.todolist, filter:'all'}
        return [ newTodolist, ...state ]
        
      }
      case "CHANGE-TODOLIST-TITLE": {
        const todolist = state.find((tl) => tl.id === action.id);
        if (todolist) {
          // если нашёлся - изменим ему заголовок
          todolist.title = action.title;
        }
        return [...state];
      }
      case "CHANGE-TODOLIST-FILTER": {
        const todolist = state.find((tl) => tl.id === action.id);
        if (todolist) {
          // если нашёлся - изменим ему заголовок
          todolist.filter = action.filter;
        }
        return [...state];
      }
      default:
        return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist:TodolistDomainType) => {
    return {type: 'ADD-TODOLIST',todolist } as const
}
export const changeTodolistTitleAC = (id: string, title: string)=> {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const SetTodoListsAC = (todolist:TodolistType[]) => {
  return {type:'SET-TODOS', todolist} as const
}

export const getTodoTC = () => (dispatch:Dispatch) => {
  todolistAPI.getTodolists().then ((res)=>{
    const data = res.data
    dispatch(SetTodoListsAC(data))
  })
}
