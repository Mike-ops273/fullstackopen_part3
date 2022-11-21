const { json } = require('express')
const express = require('express') 
const app = express()

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
  response.json(deleted)
})

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})