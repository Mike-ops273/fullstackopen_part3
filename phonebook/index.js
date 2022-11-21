const { json } = require('express')
const express = require('express') 
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let maxId = Math.max(...persons.map(person => person.id))

let information = [
  {
    "numberOfContacts": `phonebook has information for ${maxId} people`,
    "dateOfQuery": Date()
  }
]

//testing route
app.get('/',  (request, response) => (
  response.send('get request homepage')
))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const found = persons.find(person => person.id === id)
  if(!found) {
    return response.status(404).send("no person registered")
  } else {
    return response.json(found)
  }
})

app.get('/info', (request, response) => {
  response.json(information)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const deleted = persons.filter(person => person.id !== id)
  console.log("deleted person", id)
  response.json(deleted)
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 1000)
  const newPerson = request.body
  console.log(newPerson)
  newPerson.id = id
  persons = persons.concat(newPerson)
  response.json(persons)
})

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})