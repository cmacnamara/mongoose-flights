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
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate,
  })
}

function create(req,res) {
  //remove empty properties to allow for default values from model
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function show(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Detail',
      flight
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
    const dt = flight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight',
      departsDate,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update(req,res){
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

function createTicket(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteTicket(req,res) {
  console.log('Req params', req.params);
  Flight.findById(req.params.flightId)
  .then(flight => { 
    console.log('Flight ticket subdocument', flight.tickets.id(req.params.ticketId));
    flight.tickets.id(req.params.ticketId).remove()
    .then(result => {
      result.save()
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
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
  createTicket,
  deleteTicket
}