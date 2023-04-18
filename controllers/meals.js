import { Meal } from '../models/meal.js';

function newMeal(req,res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals: meals
    })
  })
  .catch(err => {
    console.log(err);
    res.render('/flights')
  })
}

export {
  newMeal as new,
}