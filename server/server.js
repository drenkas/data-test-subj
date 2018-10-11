const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const tracer = require('tracer').colorConsole()
const app = express()
const PORT = 5000
// Route requires


// MIDDLEWARE
app.use(morgan('dev'))

app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'secretniy-secret', 
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, 
		saveUninitialized: false 
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
require('./routes/index')(app)

// Starting Server 
app.listen(PORT, () => {
	tracer.info(`App listening on PORT: ${PORT}`)
})

