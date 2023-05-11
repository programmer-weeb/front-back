const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 5000;
const path = require('path');
// const fs = require('fs');
// const __dirname = path.resolve();
const cors = require("cors");

let globalId = 3;
const persons = [
    {
        "id": 1,
        "name": "Ahmed",
        "age": 22,
        "gender": "male",
        "email": "Ahmed@gmail.com"
    },
    {
        "id": 2,
        "name": "Mohamed",
        "age": 25,
        "gender": "male",
        "email": "mohamed@gmail.com"
    }
]

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'))
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.post('/persons', (req, res) => {
    const id = globalId++
    const objectSent = req.body;
    const newPerson = { id, ...objectSent }

    persons.push(newPerson)
    console.log('the new person ', newPerson);
    res.send("Added Success")
})

app.put('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        const { name, age, gender, email } = req.body
        person.name = name || person.name
        person.age = age || person.age
        person.gender = gender || person.gender
        person.email = email || person.email
        res.send("Updated Success")
    } else {
        res.send('Person not found')
    }
})

app.delete('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = persons.findIndex(p => p.id === id)
    if (index !== -1) {
        persons.splice(index, 1)
        res.send("Deleted Success")
    } else {
        res.send('Person not found')
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})