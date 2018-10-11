const path = require('ramda').path
const tracer = require('tracer').colorConsole()
const express = require('express')
const router = express.Router()
const User = require('../database/models/user')

router.post('/', (req, res) => {
	const newUser = new User({
			username: path(['body', 'username'], req),
			email: req.body.email,
			password: req.body.password,
	})
	newUser.save((err, savedUser) => {
		if (err) return res.status(203).json(err)
		res.json(savedUser)
	})
})

router.post('/checkExists', (req, res, next) => {
		if (req.body.type === 'username') {
			User.findOne({ username: req.body.value }, (err, user) => {
				if (err) {
					tracer.error('User.js post error: ', err)
				} else if (user) {
						res.status(203).json({
							error: `Sorry, already a user with the username: ${req.body.value}`
						})
				} else {
					res.json({msg: 'Check usename: OK'})
				}
			})
		} else if (req.body.type === 'email') {
			User.findOne({ email: req.body.value }, (err, user) => {
				if (err) {
					tracer.error('User.js post error: ', err)
				} else if (user) {
						res.status(203).json({
							error: `Sorry, already a user with the email: ${req.body.value}`
						})
				} else {
					res.json({msg: 'Check usename: OK'})
				}
			})
		}
})

module.exports = router