import React from "react";

const Posts = () => {
  return (
    <div className="posts-div">
      <ul className="posts-list">
        <li className="list-el">
          <div className="post-date-desc-wrap">
            <h6 className="post-date">12/25/1999 at 05:15PM</h6>
            <h5 className="post-description">Christmas Dinner</h5>
          </div>
          <div className="calories">950 cal</div>
        </li>
      </ul>
    </div>
  )
}

export default Posts;