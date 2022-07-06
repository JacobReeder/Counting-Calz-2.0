import React, { useState } from 'react';

const MealsPage = () => {

  const handleRefreshBtn = () => {
    document.location.reload();
  }
  return (
    <div className='meals-div'>

      <div className='img-title'>
        <img alt='featured meal' className='meal-img' src='https://picsum.photos/300' />
        <h3 className='meal-title'>TEST MEAL</h3>
      </div>

      <div className='ing-btns'>
        <ul className='list-ingredients'>
          <li className='ingredient'>Beets</li>
          <li className='ingredient'>Deets</li>
          <li className='ingredient'>Reets</li>
          <li className='ingredient'>Seets</li>
          <li className='ingredient'>Leets</li>
          <li className='ingredient'>Keets</li>
        </ul>
        <div className='btns-wrap'>
          <button className='try-meal-btn'>Try This Meal</button>
          <button 
          className='refresh-meal-btn'
          onClick={() => {
            handleRefreshBtn()
          }}>
            Refresh
          </button>
        </div>
      </div>

    </div>
  )
}

export default MealsPage;
