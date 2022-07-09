import React, { useState } from 'react';

const LoginModal = ({ onClose, currentPage, handlePageChange }) => {
  const [currentTab, setCurrentTab] = useState('login');
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  }

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
  }

  const handleFormSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

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
            <form id="login-form" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  className="modal-input"
                  type="text"
                  name="email"
                  value={formState.email}
                  onChange={handleFormChange}
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
                  value={formState.password}
                  onChange={handleFormChange}
                />
              </div>
              {error && <div>Log In Failed</div>}
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
          <form id="login-form" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='username'>Username</label>
              <br></br>
              <input
                className='modal-input'
                type='text'
                name='username'
                value={formState.username}
                onChange={handleFormChange}
              />
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                className="modal-input"
                type="text"
                name="email"
                value={formState.email}
                onChange={handleFormChange}
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
                value={formState.password}
                onChange={handleFormChange}
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