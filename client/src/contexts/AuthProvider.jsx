import { useState } from 'react';
import UserContext from './UserContext';
import Axios from 'axios';
import * as yup from 'yup';

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password need to be atlast 8 characteres lenght")
      .required("Password is required"),
  });
  
  const handleAllTasks = (email) => {
    Axios.get(`http://localhost:3000/tasks/${email}`
    ).then((response) => {
      setTasks(response.data);
    }).catch(() => new Error('Error while trying to connect'))
  }

  const handleLogin = (values) => {
    Axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setLogin(response.data);
    });
  };

  const handleInputTask = (event) => {
    setNewTask(event.target.value);
    console.log(newTask)
  }

  const handleSavedTasks = (email) => {
    Axios.post("http://localhost:3000/tasks", {
      task: newTask,
      email: email,
    }).then((response) => {
      console.log('oi')
      setLogin(response.data);
    });
  }

  const dataArray = {
    handleLogin,
    login,
    validationsLogin,
    tasks,
    handleSavedTasks,
    handleAllTasks,
    handleInputTask,
  }

 return (
   <UserContext.Provider value={ dataArray }>
     {children}
   </UserContext.Provider>
 );
};
