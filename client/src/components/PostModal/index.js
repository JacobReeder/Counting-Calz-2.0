import React, { useState } from 'react';
import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations'

const PostModal = ({ onClose }) => {
  const user = Auth.getProfile().data._id

  const [ formState, setFormState ] = useState({ user_id: user, calories: '', description: '', date_time: '' });

  const [addPost, { error }] = useMutation(ADD_POST);

  const handleFormChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  }
  
  const handleFormSubmit = async event => {
    event.preventDefault()

    try {
      await addPost({
        variables: { ...formState, user_id: user, calories: parseInt(formState.calories) }
      });

      setFormState({ user_id: user, calories: '', description: '', date_time: '' })

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="backdrop">
      <div className="modalContainer">
        <h3 className="modalTitle">New Meal</h3>
        <form id="post-form" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="calories">Calories</label>
            <br></br>
            <input 
            className="modal-input" 
            type="text" 
            name="calories"
            onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="description">Meal Description</label>
            <br></br>
            <input 
            className="modal-input" 
            type="text" 
            name="description" 
            onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="date_time" className="fw-bold">When did you have this meal?</label>
            <input 
            type="datetime-local" 
            name="date_time"
            onChange={handleFormChange}
            />
          </div>
          {error && <div>Error in posting, please try again</div>}
          <button className="edit-goal-btn btn-padding" type="submit">Save</button>
          <button className="edit-goal-btn btn-padding" type="click" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default PostModal;