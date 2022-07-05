import React from "react";

const Nav = (props) => {
  const { currentPage, handlePageChange } = props;
  return (
    <nav>
      <a href="#dashboard" 
      onClick={() => handlePageChange('dashboard')}
      className={currentPage === 'dashboard' ? 'active-nav' : ''}>Dashboard</a>

      <a href="#history" 
      onClick={() => handlePageChange('history')}
      className={currentPage === 'history' ? 'active-nav' : ''}>History</a>

      <a href="#meals" 
      onClick={() => handlePageChange('meals')}
      className={currentPage === 'meals' ? 'active-nav' : ''}>Meals</a>

      {/* <a href="#login" 
      onClick={() => handlePageChange('login')}
      className={currentPage === 'login' ? 'active-nav' : ''}>Login</a>

      <a href="#logout" 
      onClick={() => handlePageChange('logout')}
      className={currentPage === 'logout' ? 'active-nav' : ''}>Logout</a> */}

    </nav>
  )
}

export default Nav;