import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import Goal from './components/Goal'
import Posts from './components/Posts'

function App() {

  const [ currentPage, setCurrentPage ] = useState('dashboard')

  const renderPage = () => {
    if (currentPage === 'dashboard') {
      return (
        <>
          <Goal />
          <Posts />
        </>
      )
    }
  }
  
  return (
    <>
      <header>
        <a href="/" className='site-title'>The Cal-Zone</a>
        <Nav />
      </header>
      <main>
        <div className='main-wrap'>
          {renderPage()}
        </div>
      </main>
    </>
  );
}

export default App;
