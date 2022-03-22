import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import '../App.css';
import { Login } from '../features/authSlice';

export default function SignInPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(Login(values));
  };

  return (
    <div className='text-center m-5-auto'>
      <h2>Sign in to us</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username or email address</label>
          <br />
          <input
            type='text'
            name='email'
            required
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type='password'
            name='password'
            required
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </p>
        <p>
          <button id='sub_btn' type='submit'>
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
