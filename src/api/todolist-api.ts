import axios from 'axios'



const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'e0e4e810-bd22-453d-b719-7a96986531e7',
    },
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
   ...settings
  });



export const todolistAPI = {
 
  getTodolists() {
    return axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists", settings);
  },

  createTodolist(title:string) {
    return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title:'Evgeny and Aria'},settings);
},

  deleteTodolist(todoListId:string) {
    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings); 
  },

  updateTodolist(todolistId: string, title: string) {
    return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{ title: title },settings);
  },
};




