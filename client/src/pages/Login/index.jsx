import React from 'react';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div>
      <form>
        <label>
          Email
          <input type='text'/>
        </label>
        <label>
          Password
          <input type='text'/>
        </label>
      </form>
      <Link to="/register" type="button">Register</Link>
    </div>
  );
}

export default Login;