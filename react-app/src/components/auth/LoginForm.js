import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('')

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const checkAddress = async (e) => {
    e.preventDefault()
    const encodedAddress = encodeURI(address)
    console.log(encodedAddress)

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=MY_API_KEY`)
    const data = await response.json()
    console.log(data)
  }

  return (
    <>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
        </div>
      </form>

      <form onSubmit={checkAddress}>
      <div>
          <label htmlFor='address'>Address</label>
          <input
            name='address'
            type='text'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type='submit'>Check Address</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
