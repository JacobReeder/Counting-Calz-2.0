import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import Goal from './components/Goal'
import Posts from './components/Posts'
import MealsPage from './components/Meals-Page'
import PostModal from './components/PostModal'
import LoginModal from './components/LoginModal'

// apollo creation
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from './utils/queries';

import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [ currentPage, setCurrentPage ] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [ isLoginModalOpen, setIsLoginModalOpen ] = useState(false);
  const [ showLoginNav, setShowLoginNav ] = useState(true);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
    setIsBlurred(!isBlurred);
  };

  function toggleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  function toggleLoginNav() {
    setShowLoginNav(!showLoginNav);
    if (showLoginNav) {
      setCurrentPage('meals')
      return
    }
  }

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
          <div>
            {isLoginModalOpen && (
              <LoginModal onClose={toggleLoginModal}/>
            )}
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
// =======================================================================================npm i jwt-decode
  const handlePageChange = (page) => setCurrentPage(page);
  
  return (
    <>
      <ApolloProvider client={client}>
        <header>
          <a href="/" className='site-title'>The Cal-Zone</a>
          <Nav showLoginNav={showLoginNav} handlePageChange={handlePageChange} currentPage={currentPage} toggleLoginModal={toggleLoginModal} />
        </header>
        <main>
          <div className='main-wrap'>
            {renderPage()}
          </div>
        </main>
      </ApolloProvider>
    </>
  );
}

export default App;
