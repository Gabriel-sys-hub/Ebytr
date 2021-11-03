import React, { useContext, useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import { FaSortAlphaDown } from 'react-icons/fa';
import { ImSortAmountAsc } from 'react-icons/im';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';
import HandleChangeColor from '../../components/handleChangeColor';
import UserContext from '../../contexts/UserContext';
import './styles.scss';

function Task() {
  const {
    login,
    changeOrderByStatus,
    handleAllTasks,
    handleSavedTasks,
    handleInputTask,
    tasks,
    deleteTask,
    editTaskPost,
    handleEditedTask,
    editTaskStatus,
    changeOrderByDate,
  } = useContext(UserContext);
  const [logedUser, setLogedUser] = useState();
  const [editModel, setEditModel] = useState();
  const [changeTrue, setChangeTrue] = useState(false);

  const changeNameStatus = (id, statusName) => {
    if (statusName === 'Pending') editTaskStatus({ id, status: 'InProgress' });
    if (statusName === 'Done') editTaskStatus({ id, status: 'Pending' });
    if (statusName === 'InProgress') editTaskStatus({ id, status: 'Done' });
  };

  useEffect(() => {
    if (login.email) localStorage.setItem('email', login.email);
    const getEmailFromLocal = localStorage.getItem('email');
    if (!logedUser) setLogedUser(getEmailFromLocal);
    if (login.email) handleAllTasks(login.email);
    if (!login.email) handleAllTasks(logedUser);
  }, [logedUser]);

  return (
    <div className="mainContainer">
      <header className="firstHeader">
        <button type="button" onClick={() => handleAllTasks(logedUser)}>
          <BiTask />
        </button>
        <button
          type="button"
          onClick={() => {
            changeOrderByDate();
            setChangeTrue(!changeTrue);
          }}
        >
          <FaSortAlphaDown />
        </button>
        <button
          type="button"
          onClick={() => {
            changeOrderByStatus();
            setChangeTrue(!changeTrue);
          }}
        >
          <ImSortAmountAsc />
        </button>
      </header>
      <main className="taskContainer">
        {tasks.length > 0
          && tasks.map(({
            _id: id, task, createdAt, status,
          }) => (
            <div className="eachTaskContainer" key={id}>
              {!editModel && (
              <div className="task">
                <p>{task}</p>
              </div>
              )}
              {!editModel && (
              <p className="date">
                {format(
                  Date.parse(createdAt),
                  "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                  { locale: pt },
                )}
              </p>
              )}
              {!editModel && (
              <div className="status">
                <HandleChangeColor
                  changeNameStatus={() => changeNameStatus(id, status)}
                  status={status}
                />
                {status}
              </div>
              )}
              <div className="buttonContainer">
                {!editModel && (
                <button
                  type="button"
                  onClick={() => deleteTask(id)}
                >
                  <AiFillDelete />
                </button>
                )}
                {!editModel && (
                <button type="button" onClick={() => setEditModel(true)}>
                  <AiFillEdit />
                </button>
                )}
                {editModel && (
                <div className="inputEditContainer">
                  <input
                    className="modalInput"
                    type="text-area"
                    onChange={handleEditedTask}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      editTaskPost(id);
                      setEditModel(false);
                    }}
                  >
                    Send Edit
                  </button>
                </div>
                )}
              </div>
            </div>
          ))}
      </main>
      <header className="secondHeader">
        <div className="picture">A</div>
        <div className="user">{login.email || logedUser}</div>
        <form className="createTaskContainer">
          <div className="submitContainer">
            <input type="text" onChange={handleInputTask} />
            <button
              type="submit"
              name="submit"
              onClick={(event) => {
                handleSavedTasks(event, logedUser);
              }}
            >
              Submit Task
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Task;
