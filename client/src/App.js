import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import Goal from './components/Goal'
import Posts from './components/Posts'
import MealsPage from './components/Meals-Page'
import PostModal from './components/PostModal'
import LoginModal from './components/LoginModal'

// adding random imports from the deep-thoughts App.js to possibly help
import { setContext } from '@apollo/client/link/context';


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
  const [currentPage, setCurrentPage] = useState('meals')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLoginNav, setShowLoginNav] = useState(true);

  // queries
  // const { loading, data } = useQuery(QUERY_USERS);
  const userGoal = data?.me.goal || '';
  const userPosts = data?.me.posts || [];
  const userName = data?.me.username || '';

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
          {/* {loading ? ( */}
            {/* <div className='posts-div'>Loading...</div> */}
          {/* ) : ( */}
            <>
              {/* <Goal userGoal={userGoal} userName={userName} /> */}
              {/* <Posts userPosts={userPosts} /> */}
            </>
          {/* )}  */}
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
              <LoginModal onClose={toggleLoginModal} />
            )}
          </div>
        </>
      )
    }
    if (currentPage === 'history') {
      // return <Posts userPosts={userPosts} />
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
