import React from "react";

const Posts = () => {
  return (
    <div className="posts-div">
      <ul className="posts-list">
        {userPosts &&
          userPosts.map((post) => (
            <li key={post._id} className="list-el">
              <div className="post-date-desc-wrap">
                <h6 className="post-date">{post.date_time}</h6>
                <h5 className="post-description">{post.description}</h5>
              </div>
              <div className="calories">{post.calories} cal</div>
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
  )
}

export default Posts;