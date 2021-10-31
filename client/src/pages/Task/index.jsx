import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import './styles.scss';

function Task() {
  const { login: { email }, handleAllTasks, handleSavedTasks, handleInputTask, tasks } = useContext(UserContext);
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
  },[email, setLogedUser, logedUser])


  return (
  <div className="mainContainer">
    <header className="firstHeader">
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
            <div className="task">
              {eachItem.task}
            </div>
            <div className="buttonContainer">
              <button>
                B1
              </button>
              <button>
                B1
              </button>
              <button>
                B1
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