import React from "react";

import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../utils/mutations';

const Goal = () => {
  return (
    <div className="goal-div">
      <h3 className="calorie-goal">1400</h3>
      <h3 className="calorie-dec">Calories Left Today</h3>
      <button className="edit-goal-btn">Edit Goal</button>
    </div>
  )
}

export default Goal;