const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('static_build'));


const PORT = process.env.PORT || 3001;
const MAX_ID = 1_000_000;

const generateID = (persons) => {
    let id = 0;
    while (true) {
        id = Math.floor(Math.random() * MAX_ID);
        const exists = persons.find(person => person.id === id);
        if (!exists) break;
    }
    return id;
}

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({
            error: 'Missing data.'
        });
    }
    if (persons.find(person => person.name === name)) {
        return res.status(400).json({
            error: 'Name must be unique.'
        });
    }
    const person = {
        id: generateID(persons),
        name, number
    }
    persons = persons.concat(person);
    res.json(person);
    res.end();
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (!person) return res.status(404).json({ error: 'Person not found.' });
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.get('/info', (req, res) => {
    const date = new Date();
    const html = `<p>Phonebook has info for ${persons.length} people.</p>
                  <p>${date.toString()}</p>`
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});