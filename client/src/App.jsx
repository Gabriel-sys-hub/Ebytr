import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Task from './pages/Task';
import './global.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/tasks">
          <Task />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
