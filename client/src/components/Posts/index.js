import React, { useEffect, useState } from "react";
import { QUERY_ME } from "../../utils/queries";
import { DELETE_POST } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const Posts = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userPosts = data?.me.posts || [];
  const userName = data?.me.username || '';
  const [deletePost, { error }] = useMutation(DELETE_POST);
  
  const refreshPage = () => {
    window.location.reload(false)
  }
  
  const onClickDeletePost = async (id) => {
    try {
      await deletePost({
        variables: {
          deletePostId: id
        }
      })
    } catch(e) {
      console.error(e)
    }
    console.log(`${id} post deleted`)
    refreshPage()
  }
  
  return (
    <>
      {loading ? (
        <div className="posts-div">Loading...</div>
      ) : (
        <div className="posts-div">
          <div>Showing all posts for {userName}</div>
          <ul className="posts-list">
            {userPosts &&
              userPosts.map((post) => (
                <li key={post._id} className="list-el">
                  <div className="post-date-desc-wrap">
                    <h6 className="post-date">{post.date_time}</h6>
                    <h5 className="post-description">{post.description}</h5>
                  </div>
                  <div className="post-button-div">
                    <div className="calories">{post.calories} cal</div>
                    <button className="delete-post" 
                      onClick={() => {
                        onClickDeletePost(post._id)
                        
                        }}>Delete Post</button>
                  </div>
                </li>
              ))}
            {/* below is the hardcoded data from before */}
            {/* <li className="list-el">
              <div className="post-date-desc-wrap">
                <h6 className="post-date">12/25/1999 at 05:15PM</h6>
                <h5 className="post-description">Christmas Dinner</h5>
              </div>
              <div className="calories">950 cal</div>
            </li> */}
          </ul>
        </div>
      )}
    </>
  )
}

export default Posts;