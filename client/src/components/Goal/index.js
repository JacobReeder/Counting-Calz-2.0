import React, { useState } from "react";

import { ADD_GOAL } from "../../utils/mutations";

import { useMutation } from "@apollo/client";

const Goal = ({userName, userGoal}) => {
  const [ showEditInput, setShowEditInput ] = useState(false)
  const [ inputState, setInputState ] = useState('')

  const [ addGoal, { error } ] = useMutation(ADD_GOAL);

  const handleEditInputVisibility = () => {
    setShowEditInput(true)
  }

  const handleInputChange = (event) => {
    setInputState(event.target.value)
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addGoal({
        variables: { goal: parseInt(inputState) }
      });
      setShowEditInput(false)
    } catch (e) {
      console.error(e);
    };
  }
  
  return (
    <div className="goal-div">
      <p>Hello {userName}</p>
      <h3 className={!userGoal || showEditInput ? 'hidden' : 'calorie-goal'}>{userGoal ? userGoal : ''}</h3>
      <h3 className={!userGoal ? '' : 'hidden'}>Create Your Goal Below</h3>
      {userGoal ? <h3 className={!showEditInput ? "calorie-dec" : 'hidden'}>Calories Left Today</h3> : ''}
      <button className={!showEditInput ? (
        "edit-goal-btn"
      ) : (
        'hidden'
      )} 
      onClick={handleEditInputVisibility}>Edit Goal</button>
      <form onSubmit={handleFormSubmit} className={!showEditInput ? 'hidden' : ''}>
        <label htmlFor="goal">New Calorie Goal</label>
        <br></br>
        <input 
        type="number" 
        name="goal" 
        min="1" 
        max="10000" 
        placeholder={userGoal ? userGoal : ''} 
        onChange={handleInputChange}/>
        <button className="edit-goal-btn" type="submit">Save</button>
      </form>
    </div>
  )
}

export default Goal;