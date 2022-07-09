import React from "react";

const Goal = ({userName, userGoal}) => {
  return (
    <div className="goal-div">
      <p>Hello {userName}</p>
      <h3 className={userGoal ? "calorie-goal" : ''}>{userGoal ? userGoal : 'Create Your Goal Below'}</h3>
      {userGoal ? <h3 className="calorie-dec">Calories Left Today</h3> : ''}
      <button className="edit-goal-btn">Edit Goal</button>
    </div>
  )
}

export default Goal;