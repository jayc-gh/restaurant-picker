import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col">
        <form action="">
          <div>
            <label>Username</label>
            <input type="text" placeholder="Enter username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <div>
            <button className="button-style">Sign Up</button>
            <button className="button-style">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
