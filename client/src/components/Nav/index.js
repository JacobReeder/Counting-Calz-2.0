import React from "react";
import Auth from "../../utils/auth";

const Nav = (props) => {
  const { currentPage, handlePageChange, showLoginNav, toggleLoginModal } = props;

  const handleLogout = () =>  {
    Auth.logout()
  }

  const renderConditionalNav = () => {
    if (showLoginNav) {
      return (
        <>
          <a href="#meals"
            onClick={() => handlePageChange('meals')}
            className={currentPage === 'meals' ? 'active-nav' : ''}>Meals</a>

          <a href="#login"
            onClick={() => toggleLoginModal()}
            className={currentPage === 'login' ? 'active-nav' : ''}>Login</a>
        </>
      )
    } else {
      return (
        <>
          <a href="#dashboard"
            onClick={() => handlePageChange('dashboard')}
            className={currentPage === 'dashboard' ? 'active-nav' : ''}>Dash</a>
  
          <a href="#history"
            onClick={() => handlePageChange('history')}
            className={currentPage === 'history' ? 'active-nav' : ''}>History</a>
  
          <a href="#meals"
            onClick={() => handlePageChange('meals')}
            className={currentPage === 'meals' ? 'active-nav' : ''}>Meals</a>
  
          <a href="#logout"
            onClick={() => handleLogout()}
            className="logout-btn">Logout</a>
        </>
      )
    }
  }

  return (
    <nav className={showLoginNav ? 'nav-tabs-sm' : 'nav-tabs'}>
      {renderConditionalNav()}
    </nav>
  )
}

export default Nav;