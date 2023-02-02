const mongoose = require('mongoose')

if (process.argv.length<3) { //process.argv - cl argument vector
  console.log('give password as argument') //on argv[2]
  process.exit(1)
}

const password = process.argv[2] 
const name = process.argv[3] 
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.dewheyw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({ //parameters are passed as cl arguments
  name: name,
  number: number,
})

if (process.argv.length === 3) { //if the cl only contains a password argument
  console.log('phonebook:');  
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close() //prevents hanging forever
    //process.exit(0) terminates gracefully when commented out
  })
} else {
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}


