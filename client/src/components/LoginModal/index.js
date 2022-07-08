import React, { useState } from 'react';



const LoginModal = ({ onClose, currentPage, handlePageChange }) => {
  const [currentTab, setCurrentTab] = useState('login')

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
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
            <form id="login-form">
              <div>
                <label htmlFor="email">Email</label>
                <br></br>
                <input className="modal-input" type="text" name="email" />
              </div>
              <div>
                <label htmlFor="desc">Password</label>
                <br></br>
                <input id="pw" className="modal-input" type="text" name="password" />
              </div>
              {/* error message */}
              <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
              <a href="#login"
                id="btn-style"
                onClick={console.log('login button clicked')}
                className={currentPage === 'signup' ? 'active-nav' : ''}>
                Log In
              </a>
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
          <form id="login-form">
            <div>
              <label htmlFor="email">Email</label>
              <br></br>
              <input className="modal-input" type="text" name="email" />
            </div>
            <div>
              <label htmlFor="desc">Password</label>
              <br></br>
              <input id="pw" className="modal-input" type="text" name="password" />
            </div>
            {/* error message */}
            <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
            <a href="#signup"
              id="btn-style"
              onClick={() => console.log('signup button clicked')}
              className={currentPage === 'signup' ? 'active-nav' : ''}>Sign Up</a>
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