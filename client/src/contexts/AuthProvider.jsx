import { useState } from 'react';
import UserContext from './UserContext';
import Axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState({});

  const handleLogin = (values) => {
    Axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setLogin(response.data);
    });
  };

  const dataArray = {
    handleLogin,
    login,
  }

 return (
   <UserContext.Provider value={ dataArray }>
     {children}
   </UserContext.Provider>
 );
};
