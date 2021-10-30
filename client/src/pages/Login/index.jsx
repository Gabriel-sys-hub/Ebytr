import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './styles.scss';

function Login() {
  
  const context = useContext(UserContext);

  console.log(context)

  return (
    <div className="loginContainer">
      { context.login.email && <Redirect to="/tasks"/>}
    <div className="loginWhiteContainer">
    <h1 className="loginName">Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={context.handleLogin}
        validationSchema={context.validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          {/*Outro campo*/}
          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
          <Link to="/register" type="button"><button className="registerButton" type="button">Register</button></Link>
        </Form>
      </Formik>
    </div>
    </div>
  );
}

export default Login;