import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import Axios from 'axios';
import * as yup from 'yup';
import UserContext from './UserContext';

const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [editedTask, setEditedTask] = useState();
  const [error, setError] = useState([]);

  const validationsLogin = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password need to be atlast 8 characteres lenght')
      .required('Password is required'),
  });

  const handleLogin = (values) => {
    Axios.post('http://localhost:3000/login', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setLogin(response.data);
    }).catch((err) => setError(err));
  };

  const handleInputTask = (event) => {
    setNewTask(event.target.value);
  };

  const changeOrderByDate = () => {
    const sort = tasks.sort((a, b) => {
      if (a.task.toLowerCase() < b.task.toLowerCase()) return -1;
      if (a.task.toLowerCase() > b.task.toLowerCase()) return 1;
      return 0;
    });
    setTasks(sort);
  };

  const handleAllTasks = (email) => {
    Axios.get(`http://localhost:3000/tasks/${email}`)
      .then((response) => {
        setTasks([...response.data]);
      })
      .catch(() => new Error('Error while trying to connect'));
  };

  const changeOrderByStatus = () => {
    const sort = tasks.sort((a, b) => {
      if (a.status.toLowerCase() > b.status.toLowerCase()) return -1;
      if (a.status.toLowerCase() < b.status.toLowerCase()) return 1;
      return 0;
    });
    setTasks(sort);
  };

  const editTaskPost = (id) => {
    const email = localStorage.getItem('email');
    Axios.put('http://localhost:3000/tasks/', {
      task: editedTask,
      id,
    })
      .then((response) => response)
      .then(() => handleAllTasks(email))
      .catch((err) => err);
  };

  const editTaskStatus = (id, status) => {
    const email = localStorage.getItem('email');
    Axios.put('http://localhost:3000/tasks/status', {
      id,
      status,
    })
      .then((response) => response)
      .then(() => handleAllTasks(email))
      .catch((err) => err);
  };

  const handleEditedTask = (event) => {
    setEditedTask(event.target.value);
  };

  const handleSavedTasks = (event, email) => {
    event.preventDefault();
    Axios.post('http://localhost:3000/tasks', {
      task: newTask,
      email,
    }).then(() => {
      handleAllTasks(email);
    });
  };

  const deleteTask = useCallback((targetId) => {
    const id = targetId;
    Axios.delete(`http://localhost:3000/tasks/${id}`, {})
      .then(() => {
        const getEmailFromLocal = localStorage.getItem('email');
        handleAllTasks(getEmailFromLocal);
      })
      .catch((err) => err);
  }, []);

  const dataArray = {
    handleLogin,
    login,
    validationsLogin,
    tasks,
    handleSavedTasks,
    handleAllTasks,
    handleInputTask,
    deleteTask,
    editTaskPost,
    handleEditedTask,
    editTaskStatus,
    changeOrderByDate,
    changeOrderByStatus,
    error,
  };

  return (
    <UserContext.Provider value={dataArray}>{children}</UserContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AuthProvider;
