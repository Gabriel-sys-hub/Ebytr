import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import './styles.scss';

function Register() {
  const [error, setError] = useState();

  const handleClickRegister = (values) => {
    Axios.post('http://localhost:3000/register', {
      email: values.email,
      password: values.password,
    }).then((response) => response).catch((err) => setError(err));
  };

  const validationRegister = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  });

  return (
    <div className="container">
      <h1>Register</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            { error && <p>{error}</p>}
            <ErrorMessage
              component="span"
              name="email"
            />
            <Field name="password" className="form-field" placeholder="Password" />
            { error && <p>{error}</p>}
            <Field name="repeat-password" className="form-field" placeholder="Repeat Password" />
            <ErrorMessage
              component="span"
              name="password"
            />
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
