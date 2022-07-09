import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav'
import Posts from './components/Posts'
import MealsPage from './components/Meals-Page'
import LoginModal from './components/LoginModal'
import Dash from './components/Dash';

// apollo creation
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// import Authentication class
import Auth from './utils/auth';

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
  const [currentPage, setCurrentPage] = useState('meals')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLoginNav, setShowLoginNav] = useState(true);

  useEffect(() => {
    handleNavRender()
  }, [setCurrentPage])

  // left as comment for comparison
  // const { loading, data } = useQuery(QUERY_ME);
  // const userGoal = data?.me.goal || '';
  // const userPosts = data?.me.posts || [];
  // const userName = data?.me.username || '';


  // left as comment for comparison
  // function toggleModal() {
  //   setIsModalOpen(!isModalOpen);
  // };

  function toggleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  // function no longer makes sense
  // function toggleLoginNav() {
  //   setShowLoginNav(!showLoginNav);
  //   if (showLoginNav) {
  //     setCurrentPage('meals')
  //     return
  //   }
  // }

  function handleNavRender() {
    if (Auth.loggedIn()) {
      setShowLoginNav(false)
      return
    }
    setShowLoginNav(true)
    return
  }
  
  const renderPage = () => {
    
    if (currentPage === 'dashboard' && Auth.loggedIn()) {
      return (
          <Dash currentPage={currentPage} />
        )
      }
      if (currentPage === 'history' && Auth.loggedIn()) {
        return <Posts />
      }
      if (currentPage === 'meals') {
        return (
          <>
          <MealsPage />
          <div>
            {isLoginModalOpen && (
              <LoginModal onClose={toggleLoginModal} />
              )}
          </div>
        </>
      )
    }
  }
  // conditional render logic
  const handlePageChange = (page) => setCurrentPage(page);
  
  // set up nav look
  // handleNavRender();
  
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
