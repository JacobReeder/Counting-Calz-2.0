import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import Goal from './components/Goal'
import Posts from './components/Posts'
import MealsPage from './components/Meals-Page'
import PostModal from './components/PostModal'

function App() {

  const [ currentPage, setCurrentPage ] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  };

  const renderPage = () => {
    if (currentPage === 'dashboard') {
      return (
        <>
          <Goal />
          <Posts />
          <div>
            {isModalOpen && (
              <PostModal onClose={toggleModal} />
            )}
            <button
              id="new-btn"
              className="new-post"
              onClick={() => toggleModal()}>
                +
            </button>
          </div>
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
