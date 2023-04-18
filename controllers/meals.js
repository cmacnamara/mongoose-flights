import { Meal } from '../models/meal.js';

function newMeal(req,res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals: meals,
      mealExists: false
    })
  })
  .catch(err => {
    console.log(err);
    res.render('/flights')
  })
}

function create(req,res) {
  Meal.create(req.body)
  .then(() => {
    res.redirect('/meals/new')
  })
  .catch(err => {
    console.log(err);
    res.render('/flights')
  })
}

function deleteMeal(req,res) {
  console.log('deleting meal');
  Meal.findByIdAndDelete(req.params.mealId)
  .then(meal => {
    res.redirect('/meals/new')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  newMeal as new,
  create,
  deleteMeal as delete,
}