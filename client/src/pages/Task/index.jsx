import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import './styles.scss';


function Task() {
<<<<<<< Updated upstream
  const { login: { email }, handleAllTasks, handleSavedTasks, handleInputTask, tasks } = useContext(UserContext);
=======
<<<<<<< Updated upstream
  const context = useContext(UserContext);
=======
  const { login: { email }, handleAllTasks, handleSavedTasks, handleInputTask, tasks, deleteTask } = useContext(UserContext);
>>>>>>> Stashed changes
  const [logedUser, setLogedUser] = useState();
  
  useEffect(() => {
    const getLogedUser = () => {
      if (email) localStorage.setItem('email', email);
      const getEmailFromLocal = localStorage.getItem('email');
      if (!logedUser) setLogedUser(getEmailFromLocal);
    }
    getLogedUser();

    if (email) handleAllTasks(email);
    if (!email) handleAllTasks(logedUser);
<<<<<<< Updated upstream
  },[email, setLogedUser, logedUser])
=======
  },[email, setLogedUser, logedUser, deleteTask])
>>>>>>> Stashed changes
>>>>>>> Stashed changes


  return (
  <div className="mainContainer">
    <header className="firstHeader">
<<<<<<< Updated upstream
      <button>
        B1
      </button>
      <button>
        B2
      </button>
      <button>
        B3
      </button>
      
    </header>
    <main className="taskContainer">
      {tasks.length > 0 && tasks.map((eachItem) => {
        return (
          <div className="eachTaskContainer" key={eachItem.id}>
=======
<<<<<<< Updated upstream
      a
    </header>
    <main className="taskContainer">
      a
=======
      <button>
        <BiTask/>
      </button>
      <button>
        B2
      </button>
      <button>
        B3
      </button>
      
    </header>
    <main className="taskContainer">
      {tasks.length > 0 && tasks.map((eachItem) => {
        return (
          <div className="eachTaskContainer" key={eachItem._id}>
>>>>>>> Stashed changes
            <div className="task">
              {eachItem.task}
            </div>
            <div className="buttonContainer">
<<<<<<< Updated upstream
              <button>
                B1
              </button>
              <button>
                B1
              </button>
              <button>
                B1
=======
              <button type="button" value={eachItem._id} onClick={(event) => deleteTask(event)}>
                <AiFillDelete/>
              </button>
              <button>
                <AiFillEdit/>
>>>>>>> Stashed changes
              </button>
            </div>
          </div>
        )
      })}
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    </main>
    <header className="secondHeader">
      <div className="picture">
        A
      </div>
      <div className="user">
        {email ? email : logedUser}
      </div>
      <form className="createTaskContainer">
        <div className="submitContainer">
          <input type="text" onChange={handleInputTask}/>
          <button type="submit" onClick={() => handleSavedTasks(logedUser)}>
            Submit Task
          </button>
        </div>
      </form>
    </header>
  </div>
  );
}

export default Task;