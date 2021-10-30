import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function Login() {
  
  const context = useContext(UserContext);

  console.log(context)

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password need to be atlast 8 characteres lenght")
      .required("Password is required"),
  });

  return (
    <div>
      {/* { context.login && <Redirect to="/tasks"/>} */}
    <h1>Login</h1>
      <Formik
        initialValues={{}}
        /* onSubmit={context.handleLogin} */
        validationSchema={validationsLogin}
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
        </Form>
      </Formik>
      <Link to="/register" type="button">Register</Link>
    </div>
  );
}

export default Login;