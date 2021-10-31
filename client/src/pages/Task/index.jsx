import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import './styles.scss';
import axios from 'axios';

function Task() {
  const { login: { email } } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [logedUser, setLogedUser] = useState();
  
  useEffect(() => {
    const getLogedUser = () => {
      if (email) localStorage.setItem('email', email);
      const getEmailFromLocal = localStorage.getItem('email');
      console.log(getEmailFromLocal);
      if (!logedUser) setLogedUser(getEmailFromLocal);
    }
    
    const handleAllTasks = (email) => {
      axios.get(`http://localhost:3000/tasks/${email}`
      ).then((response) => {
        setTasks(response.data);
      }).catch(() => new Error('Error while trying to connect'))
    }
    getLogedUser();

    if (email) handleAllTasks(email);
    if (!email) handleAllTasks(logedUser);
  },[email, setLogedUser, logedUser])


  return (
  <div className="mainContainer">
    <header className="firstHeader">
      a
    </header>
    <main className="taskContainer">
      {tasks.length > 0 && tasks.map((eachItem) => {
        return (
          <div className="eachTaskContainer" key={eachItem.id}>
            {eachItem.task}
          </div>
        )
      })}
    </main>
    <header className="secondHeader">
      <div className="">
        {email ? email : logedUser}
      </div>
    </header>
  </div>
  );
}

export default Task;