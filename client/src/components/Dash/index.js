import React, { useState } from "react";
import Goal from "../Goal";
import Posts from "../Posts";
import PostModal from "../PostModal";

// import useQuery from Apollo
import { useQuery } from "@apollo/client";

// import query for logged in user to pull the "me" query
import { QUERY_ME } from "../../utils/queries";

const Dash = ({ currentPage }) => {
  // modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  // query logic and data handling
  const { loading, data } = useQuery(QUERY_ME);
  const userGoal = data?.me.goal || '';
  // const userPosts = data?.me.posts || [];
  const userName = data?.me.username || '';

  // functions for editing states
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {loading ? (
        <div className='posts-div'>Loading...</div>
      ) : (
        <>
          <Goal userGoal={userGoal} userName={userName} />
          <Posts />
        </>
      )}
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

export default Dash;