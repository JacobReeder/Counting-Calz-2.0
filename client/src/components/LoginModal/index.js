import React, { useState } from 'react';
import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../../utils/mutations'

const LoginModal = ({ onClose }) => {
  const [currentTab, setCurrentTab] = useState('login');
  const [ loginFormState, setLoginFormState] = useState({ email: '', password: '' });
  const [ signUpFormState, setSignUpFormState] = useState({ username: '', email: '', password: '' });

  const [addUser, { error }] = useMutation(ADD_USER);
  const [loginUser, { error2 }] = useMutation(LOGIN_USER);
  
  // switch between login and signup tabs
  const handleTabChange = (tab) => {
    setCurrentTab(tab)
  }

  // form changes
  const handleLoginFormChange = event => {
    const { name, value } = event.target;
    
    setLoginFormState({
      ...loginFormState,
      [name]: value
    });
  }
  
  const handleSignUpFormChange = event => {
    const { name, value } = event.target;

    setSignUpFormState({
      ...signUpFormState,
      [name]: value
    });
  }
  
  // form submits
  const handleLoginFormSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await loginUser({
        variables: { ...loginFormState }
      });
      console.log(data, '========== data logged in try block');
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  }

  const handleSignUpFormSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await addUser({
        variables: { ...signUpFormState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  }

  const renderModal = () => {
    if (currentTab === 'login') {
      return (
        <div className="backdrop">
          <div className="modalContainer">
            <a
              href='#login'
              className={currentTab === 'login' ? 'modalTitle modal-title-active' : 'modalTitle'}
              onClick={() => handleTabChange('login')}>
              Login
            </a>
            |
            <a
              href='#login'
              className={currentTab === 'signup' ? 'modalTitle modal-title-active' : 'modalTitle'}
              onClick={() => handleTabChange('signup')}>
              Sign Up
            </a>
            <form id="login-form" onSubmit={handleLoginFormSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  className="modal-input"
                  type="text"
                  name="email"
                  value={loginFormState.email}
                  onChange={handleLoginFormChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br></br>
                <input
                  id="pw"
                  className="modal-input"
                  type="text"
                  name="password"
                  value={loginFormState.password}
                  onChange={handleLoginFormChange}
                />
              </div>
              {error2 && <div>Log In Failed</div>}
              <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
              <button
                id="btn-style"
                className='edit-goal-btn btn-padding'
                type='submit'>
                Log In
              </button>
            </form>
          </div>
        </div>
      )
    }
    return (
      <div className="backdrop">
        <div className="modalContainer">
          <a
            href='#login'
            className={currentTab === 'login' ? 'modalTitle modal-title-active' : 'modalTitle'}
            onClick={() => handleTabChange('login')}>
            Login
          </a>
          |
          <a
            href='#login'
            className={currentTab === 'signup' ? 'modalTitle modal-title-active' : 'modalTitle'}
            onClick={() => handleTabChange('signup')}>
            Sign Up
          </a>
          <form id="login-form" onSubmit={handleSignUpFormSubmit}>
            <div>
              <label htmlFor='username'>Username</label>
              <br></br>
              <input
                className='modal-input'
                type='text'
                name='username'
                value={signUpFormState.username}
                onChange={handleSignUpFormChange}
              />
              <br></br>
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                className="modal-input"
                type="text"
                name="email"
                value={signUpFormState.email}
                onChange={handleSignUpFormChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br></br>
              <input
                id="pw"
                className="modal-input"
                type="text"
                name="password"
                value={signUpFormState.password}
                onChange={handleSignUpFormChange}
              />
            </div>
            {error && <div>Sign Up Failed</div>}
            <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
            <button
              id="btn-style"
              className='edit-goal-btn btn-padding'
              type='submit'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderModal()}
    </>
  )
}

export default LoginModal;