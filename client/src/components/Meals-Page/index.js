import React, { useRef } from 'react';

const MealsPage = () => {

  var titleEl = useRef(null);
  var linkEl = useRef(null);
  var countryEl = useRef(null);
  var imageEl = useRef(null);
  var tags = useRef(null);

  function rndMeal() {
    // const url = 'https://www.themealdb.com/api/json/v1/9973533/random.php';
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  
    fetch(url)
      .then((res) => res.json())
      .then((res) => {

        if (res.meals[0].strSource !== '') {
          console.log(res.meals[0]);

          titleEl = res.meals[0].strMeal;
          linkEl = res.meals[0].strSource;
          imageEl = res.meals[0].strMealThumb;
          countryEl = res.meals[0].strArea;
          tags = res.meals[0].strTags;
          
          console.log(titleEl);
          console.log(linkEl);
          console.log(imageEl);
          console.log(countryEl);
          console.log(tags);

        } else {
          rndMeal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='meals-div'>
      <div className='img-title'>
        <img alt='featured meal' className='meal-img' src='https://picsum.photos/300' />
        <h3 ref={titleEl} className='meal-title'>TEST MEAL</h3>
      </div>

      <div className='ing-btns'>
        <h4 ref={countryEl} className="country">American Meal</h4>
        <h5 ref={tags} className="tags">Spicy, Has Nuts</h5>
        <div className='btns-wrap'>
          <button className="try-meal-btn">
            <a ref={linkEl} className="meal-link">
                Try This Meal
            </a>
          </button>
          <button 
          className='refresh-meal-btn'
          onClick={rndMeal()}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default MealsPage;