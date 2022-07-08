import React from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_POST } from '../utils/mutations';

const PostModal = ({ onClose }) => {

  return (
    <div className="backdrop">
      <div className="modalContainer">
        <h3 className="modalTitle">New Meal</h3>
        <form id="post-form">
          <div>
            <label htmlFor="count">Calories</label>
            <br></br>
            <input className="modal-input" type="text" name="count"/>
          </div>
          <div>
            <label htmlFor="desc">Meal Description</label>
            <br></br>
            <input className="modal-input" type="text" name="desc" />
          </div>
          <div>
            <label htmlFor="Time" className="fw-bold">When did you have this meal?</label>
            <input type="datetime-local"/>
          </div>
          {/* error message */}
          <button className="edit-goal-btn btn-padding" type="submit">Save</button>
          <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default PostModal;