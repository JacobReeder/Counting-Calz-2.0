import React from "react";

const Goal = () => {
    // removed hardcoded data in favor of hopefully backend data
    <div className="goal-div">
      <p>Hello {userName}</p>
      <h3 className="calorie-goal">{userGoal ? userGoal : 'Create Your Goal Below'}</h3>
      {userGoal ? <h3 className="calorie-dec">Calories Left Today</h3> : ''}
      <button className="edit-goal-btn">Edit Goal</button>
    </div>
  )
}

export default Goal;