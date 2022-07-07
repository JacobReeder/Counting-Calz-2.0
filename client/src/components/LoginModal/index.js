import React from 'react';

const LoginModal = ({ onClose, currentPage, handlePageChange }) => {

  return (
    <div className="backdrop">
      <div className="modalContainer">
        <h3 className="modalTitle">Login</h3>
        <form id="login-form">
          <div>
            <label htmlFor="email">Email</label>
            <br></br>
            <input className="modal-input" type="text" name="email"/>
          </div>
          <div>
            <label htmlFor="desc">Password</label>
            <br></br>
            <input id="pw" className="modal-input" type="text" name="password" />
          </div>
          {/* error message */}
          {/* <a href="#signup"
      id="btn-style" 
      onClick={() => handlePageChange('signup')}
      className={currentPage === 'signup' ? 'active-nav' : ''}>Sign Up</a> */}
        <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal;