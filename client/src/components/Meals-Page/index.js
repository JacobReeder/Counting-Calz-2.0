import React, { useState, useEffect } from 'react';

const MealsPage = () => {

  const [ mealTitle, setMealTitle ] = useState('loading...')
  const [ mealImg, setMealImg ] = useState('loading...')
  const [ mealLink, setMealLink ] = useState('loading...')
  const [ mealCountry, setMealCountry ] = useState('loading...')
  const [ mealTags, setMealTags ] = useState('loading...')

  useEffect(() => {
    rndMeal();
  }, [])
  
  // var titleEl = useRef(null);
  // var linkEl = useRef(null);
  // var countryEl = useRef(null);
  // var imageEl = useRef(null);
  // var tags = useRef(null);

  const rndMeal = async () => {
    // const url = 'https://www.themealdb.com/api/json/v1/9973533/random.php';
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
    
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((res) => {

    //     if (res.meals[0].strSource !== '') {
    //       console.log(res.meals[0]);

    //       titleEl = res.meals[0].strMeal;
    //       linkEl = res.meals[0].strSource;
    //       imageEl = res.meals[0].strMealThumb;
    //       countryEl = res.meals[0].strArea;
    //       tags = res.meals[0].strTags;
          
    //       console.log(titleEl);
    //       console.log(linkEl);
    //       console.log(imageEl);
    //       console.log(countryEl);
    //       console.log(tags);

    //     } else {
    //       rndMeal();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const handleBtnClick = (btn) => {
    if(btn === 'refresh') {
      rndMeal();
    } else if (btn === 'try') {

    }

  }
  
  return (
    <div className='meals-div'>
      <div className='img-title'>
        <img alt='featured meal' className='meal-img' src={mealImg} />
        <h3 className='meal-title'>{mealTitle}</h3>
      </div>

      <div className='ing-btns'>
        <h4 className="country">Nationality: {mealCountry}</h4>
        <h5 className="tags">{mealTags}</h5>
        <div className='btns-wrap'>
          <button className="try-meal-btn">
            <a href={mealLink} className="meal-link">
                Try This Meal
            </a>
          </button>
          <button 
          className='refresh-meal-btn'
          onClick={() => {
            const btn = 'refresh'
            handleBtnClick(btn)
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