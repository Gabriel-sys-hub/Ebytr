import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import HandleChangeColor from '../../components/handleChangeColor';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';
import './styles.scss';


function Task() {
  const { login: { email }, handleAllTasks, handleSavedTasks, handleInputTask, tasks, deleteTask, editTaskPost, handleEditedTask, editTaskStatus } = useContext(UserContext);
  const [logedUser, setLogedUser] = useState();
  const [editModel, setEditModel] = useState();

  const changeNameStatus = (id, statusName) => {
    if (statusName === 'Pending') editTaskStatus({ id, status: 'InProgress' })
    if (statusName === 'Done') editTaskStatus({ id, status: 'Pending' })
    if (statusName === 'InProgress') editTaskStatus({ id, status: 'Done' });
  }
  
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
            { !editModel && <div className="task">
              <p>{eachItem.task}</p>
            </div>}
            { !editModel && 
              <p className="date">{format(Date.parse(eachItem.createdAt),  "'Dia' dd 'de' MMMM', às ' HH:mm'h'", { locale: pt })}</p>
            }
            {!editModel && 
              <p className="status">
                <HandleChangeColor changeNameStatus={() => changeNameStatus(eachItem._id, eachItem.status)} status={eachItem.status}/>
                {eachItem.status}
              </p>
            }
            <div className="buttonContainer">
              { !editModel && <button type="button" onClick={() => deleteTask(eachItem._id)}>
                <AiFillDelete/>
              </button>}
              { !editModel && <button type="button" onClick={() => setEditModel(true)}>
                <AiFillEdit/>
              </button>}
              { editModel && (
                <div className="inputEditContainer">
                  <input className="modalInput" type="text-area" onChange={handleEditedTask}/>
                  <button type="button" onClick={() => {
                    editTaskPost(eachItem._id);
                    setEditModel(false);
                  }}>Send Edit</button>
                </div>
              )}
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
          <button type="submit" onClick={(event) => {
            handleSavedTasks(event, logedUser);
            }}>
            Submit Task
          </button>
        </div>
      </form>
    </header>
  </div>
  );
}

export default Task;