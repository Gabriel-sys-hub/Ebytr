import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import './styles.scss';


function Task() {
  const { login: { email }, handleAllTasks, handleSavedTasks, handleInputTask, tasks, deleteTask } = useContext(UserContext);
  const [logedUser, setLogedUser] = useState();
  
  useEffect(() => {
    if (email) localStorage.setItem('email', email);
    const getEmailFromLocal = localStorage.getItem('email');
    if (!logedUser) setLogedUser(getEmailFromLocal);
    if (email) handleAllTasks(email);
    if (!email) handleAllTasks(logedUser);
  }, [logedUser])

  return (
  <div className="mainContainer">
    <header className="firstHeader">
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
            <div className="task">
              {eachItem.task}
            </div>
            <div className="buttonContainer">
              <button type="button" onClick={() => deleteTask(eachItem._id)}>
                <AiFillDelete/>
              </button>
              <button>
                <AiFillEdit/>
              </button>
            </div>
          </div>
        )
      })}
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
          <button type="submit" onClick={(event) => handleSavedTasks(event, logedUser)}>
            Submit Task
          </button>
        </div>
      </form>
    </header>
  </div>
  );
}

export default Task;