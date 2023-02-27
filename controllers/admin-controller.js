const { Restaurant } = require('../models')

const adminController = {
  getRestaurants: (req, res, next) => {
    Restaurant.findAll({
      raw: true
    })
      .then(restaurants => res.render('admin/restaurants', { restaurants }))
      .catch(err => next(err))
  },
  createRestaurant: (req, res) => {
    return res.render('admin/create-restaurant')
  },
  postRestaurant: (req, res, next) => {
    // use form data from req.body
    const { name, tel, address, openingHours, description } = req.body
    // double check name exists!! if doesn't exist, trow error message
    if (!name) throw new Error('Restaurant name is required!')
    // else(name exist) create the restaurant data, which data from req.body
    Restaurant.create({
      name,
      tel,
      address,
      openingHours,
      description
    })
      .then(() => {
        req.flash('success_messages', 'restaurant was successfully created')
        // finish create new restaurant, redirect to admin home page
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  }
}
module.exports = adminController
