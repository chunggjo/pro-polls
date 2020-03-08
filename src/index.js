const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')
const getPoll = require('./utils/getPoll')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const MongoClient = mongodb.MongoClient //Accesss for CRUD
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:61539' //localhost is not good with this
const databaseName = 'votes'

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Welcome to AnonVote!'
	})
})
app.get('/vote', (req, res) => {
	if (!req.query.id) {
		return res.send({ error: 'Must provide a poll ID.' })
	}
	getPoll(req.query.id, (error, { title, options, votes, multi } = {}) => {
		if (error) {
			return res.send({ error })
		}
		return res.send({
			pollName: title,
			options,
			votes,
			multi
		})
	})
})

app.get('/create', (req, res) => {
	res.render('create', {
		title: 'Create your poll'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Us'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found'
	})
})

app.listen(3000, () => {
	console.log('Server up on port 3000')
})
