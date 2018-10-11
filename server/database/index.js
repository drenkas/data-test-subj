const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const tracer = require('tracer').colorConsole()

//your local database url
//27017 is the default mongoDB port
const uri = 'mongodb+srv://admin:admin@cluster0-r6p19.mongodb.net/subject-data' 
mongoose.set('useFindAndModify', false)

mongoose.connect(uri, {useNewUrlParser: true }).then(
  () => {
    tracer.trace('Connected to Mongo')
  },
  err => {
    tracer.error('\nerror connecting to Mongo: \n', err)
  }
)


module.exports = mongoose.connection