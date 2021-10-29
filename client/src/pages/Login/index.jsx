import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

function Login() {

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

  const handleLogin = (values) => {
    Axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response.data)
    });
  };

  return (
    <div>
  <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
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