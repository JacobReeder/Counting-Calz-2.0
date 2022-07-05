import React, { useState } from 'react';

const MealsPage = () => {
  return (
    <div className='meals-div'>
      <img alt='featured meal' className='meal-img' src='/' />
      <h3 className='meal-title'>TEST MEAL</h3>
      <ul className='listIngredients'>
        <li className='ingredient'></li>
      </ul>
      <button className='try-meal-btn'>Try This Meal</button>
      <button className='refresh-meal-btn'>R</button>
    </div>
  )
}

export default MealsPage;

// multiple components within this