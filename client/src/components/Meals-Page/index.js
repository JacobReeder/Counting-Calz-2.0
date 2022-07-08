import React, { useState, useEffect } from 'react';

const MealsPage = () => {

  const [ mealTitle, setMealTitle ] = useState('loading...')
  const [ mealImg, setMealImg ] = useState('loading...')
  const [ mealLink, setMealLink ] = useState('loading...')
  const [ mealCountry, setMealCountry ] = useState('loading...')
  const [ mealTags, setMealTags ] = useState('loading...')
  const [ mealIngs, setMealIngs ] = useState('1', '2')

  useEffect(() => {
    rndMeal();
  }, [setMealIngs])

  const rndMeal = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    const response = await fetch(url)
    const jsonData = await response.json();


    
    setMealTitle(jsonData.meals[0].strMeal)
    setMealImg(jsonData.meals[0].strMealThumb)
    setMealLink(jsonData.meals[0].strSource)
    setMealCountry(jsonData.meals[0].strArea)
    setMealTags(jsonData.meals[0].strTags)

    let ingredientsArr = [];
    
    for (let i = 1; i < 20; i++) {
      const ingredient = eval(`jsonData.meals[0].strIngredient${i}`);
      
      if (ingredient) {
        ingredientsArr.push(ingredient)
      }
    }
    setMealIngs(ingredientsArr)
    // console.log(mealIngs);
  }

  const handleBtnClick = () => {
      rndMeal();
  }
  
  return (
    <div className='meals-div'>
      <div className='img-title'>
        <img alt='featured meal' className='meal-img' src={mealImg} />
        <h3 className='meal-title'>{mealTitle}</h3>
      </div>

      <div className='ing-btns'>
        <h4 className="country">Nationality: {mealCountry}</h4>
        {/* <ul className='ing-list'>
          {[mealIngs].map((ing) => {
                return <p key={ing} className="ingredient">{ing}</p>              
          })}
        </ul> */}
        <div className='btns-wrap'>
          <button className="try-meal-btn">
            <a href={mealLink} className="meal-link" target="_blank" rel='noreferrer'>
                Try This Meal
            </a>
          </button>
          <button 
          className='refresh-meal-btn'
          onClick={() => {
            const btn = 'refresh'
            handleBtnClick()
          }}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default MealsPage;