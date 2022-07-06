import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import Goal from './components/Goal'
import Posts from './components/Posts'
import MealsPage from './components/Meals-Page'

function App() {

  const [ currentPage, setCurrentPage ] = useState('history')

  const renderPage = () => {
    if (currentPage === 'dashboard') {
      return (
        <>
          <Goal />
          <Posts />
        </>
      )
    }
    if (currentPage === 'history') {
      return <Posts />
    }
    if (currentPage === 'meals') {
      return <MealsPage />
    }
  }

  const handlePageChange = (page) => setCurrentPage(page);
  
  return (
    <>
      <header>
        <a href="/" className='site-title'>The Cal-Zone</a>
        <Nav handlePageChange={handlePageChange} currentPage={currentPage} />
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
