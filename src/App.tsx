import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Menu } from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodoTC,
  FilterValuesType,
  getTodoTC,
  removeTodolistAC,
  removeTodolistTC,
  setTodoListsAC,
  TodolistDomainType,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskTC,
  deleteTaskTC,
  fetchTaskTC,
  removeTaskAC,
  updateTaskTC,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskStatuses, TaskTypeAPI, todolistAPI, TodolistType } from "./api/todolist-api";

export type TasksStateType = {
  [key: string]: Array<TaskTypeAPI>;
};

function App() {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const dispatch = useDispatch();

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(deleteTaskTC(todolistId, id));
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(createTaskTC(title, todolistId));
  }, []);

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTaskTC( todolistId,id,status));
  }, []);

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }, []);

  const changeFilter = useCallback(function (todolistId: string, filter: FilterValuesType) {
    dispatch(changeTodolistFilterAC(todolistId, filter));
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    dispatch(removeTodolistTC(id));
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    dispatch(changeTodolistTitleAC(id, title));
  }, []);



  const addTodolist = useCallback((title: string) => {
    dispatch(createTodoTC(title));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTodoTC());
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
