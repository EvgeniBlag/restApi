
import axios from 'axios'
import React, {useEffect, useState} from 'react'

export default {
   title: 'API'
}

const settings = {
   withCredentials:true,
   headers:{
      "API-KEY":"e0e4e810-bd22-453d-b719-7a96986531e7"
   }
}

 const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1",
   ...settings
 });
   


export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    
      axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
       .then((res)=>{
         setState(res.data)
       })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title:'Evgeny and Aria'},settings)
      .then((res)=>{
        setState(res.data)
      })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}


 export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
     const todoListId = 'cd2b8e12-e38f-496c-ba88-cd83cd5b9d0c'
       axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
      .then((res)=>{
         setState(res.data)
       })
    }, [])

   return <div>{JSON.stringify(state)}</div>
 }


export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {

      const todoListId = '7cfb68d7-c402-4381-9ad2-69e2c862aca1'
     
      axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`,{title:'Aria y Evgeny'} , settings)
     .then((res)=>{
        setState(res.data)
      })

   }, [])

   return <div>{JSON.stringify(state)}</div>
}

