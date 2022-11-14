import { title } from 'process';
import React, {useEffect, useState} from 'react'
import { todolistAPI } from '../api/todolist-api';



  

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistAPI.getTodolists()
      .then((res) => {
         setState(res.data);
       });
   }, [])

   return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    todolistAPI.createTodolist(title)
      .then((res)=>{
        setState(res.data.data.item)
      })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}


 export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      const todoListId = 'cd2b8e12-e38f-496c-ba88-cd83cd5b9d0c'
      todolistAPI.deleteTodolist(todoListId)
      .then((res)=>{
         setState(res.data)
       });
    }, [])

   return <div>{JSON.stringify(state)}</div>
 };


export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todoListId = "7cfb68d7-c402-4381-9ad2-69e2c862aca1";
    const title = "Aria y Evgeny";

    todolistAPI.updateTodolist(todoListId, title)
    .then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

