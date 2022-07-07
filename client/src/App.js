import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import Goal from './components/Goal'
import Posts from './components/Posts'
import MealsPage from './components/Meals-Page'
import PostModal from './components/PostModal'

// apollo creation
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  // Need to add this into the page
  // <ApolloProvider client={client}></ApolloProvider>

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
