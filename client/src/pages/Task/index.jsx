import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import './styles.scss';

function Task() {
  const context = useContext(UserContext);

  console.log(context);

  return (
  <div className="mainContainer">
    <header className="firstHeader">
      a
    </header>
    <main className="taskContainer">
      a
    </main>
    <header className="secondHeader">
      <div className="">
        {context.login.email}
      </div>
    </header>
  </div>
  );
}

export default Task;