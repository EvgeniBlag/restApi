
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

      axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title:'hey'},settings)
      .then((res)=>{
        setState(res.data)
      })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}


 export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       axios.delete(`https://social-network.samuraijs.com/api/1.1/,${'82de0111-087b-4506-bd27-e3169099f81e'}`, settings)
      .then((res)=>{
         setState(res.data)
       })
    }, [])

   return <div>{JSON.stringify(state)}</div>
 }
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

