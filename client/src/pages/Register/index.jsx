import React, { useState } from 'react';
/* import { Redirect } from 'react-router-dom'; */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

function Register() {
  const [error, setError] = useState();
  /*   const [registerResponse, setRegisterResponse] = useState([]); */

  const handleClickRegister = (values) => {
    Axios.post('http://localhost:3000/register', {
      email: values.email,
      password: values.password,
    })/* .then((response) => setRegisterResponse(response)) */.catch((err) => setError(err));
  };

  const validationRegister = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  });

  return (
    <div className="container">
      {/* { registerResponse && <Redirect to="/" />} */}
      <div className="loginContainer">
        <div className="logo">
          <img src="/logo.gif" alt="Minha Figura" />
        </div>
        <div className="loginWhiteContainer">
          <h1 className="loginName">Register</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
          >
            <Form className="login-form">
              <div className="login-form-group">
                <Field name="email" className="form-field" placeholder="Email" />
                { error && error.response.data.message }
                <ErrorMessage
                  component="span"
                  name="email"
                />
                <Field name="password" type="password" className="form-field" placeholder="Password" />
                <Field name="repeat-password" type="password" className="form-field" placeholder="Repeat Password" />
                <ErrorMessage
                  component="span"
                  name="password"
                />
                <button className="button" type="submit">Register</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
