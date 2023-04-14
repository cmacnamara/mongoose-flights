import { Flight } from '../models/flight.js'

function index(req,res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function newFlight(req,res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req,res) {
  // req.body.nowShowing = !!req.body.nowShowing
  // if(req.body.cast) {
  //   req.body.cast = req.body.cast.split(', ')
  // }
  //remove empty properties to allow for default values from model
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flight')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function show(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flight/show', {
      title: 'Flight Detail',
      movie
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteFlight(req,res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function edit(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update(req,res){
  // req.body.nowShowing = !!req.body.nowShowing
  // for(let key in req.body) {
  //   if(req.body[key] === '') delete req.body[key]
  // }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete,
  edit,
  update,
}