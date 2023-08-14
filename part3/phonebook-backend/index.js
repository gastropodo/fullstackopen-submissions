require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('static_build'));


const PORT = process.env.PORT;

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result);
    });
});

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body;
    const person = new Person({ name, number });
    person.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) return res.json(person);
            else {
                const error = new Error('Person not found.');
                error.name = 'NotFoundError';
                next(error);
            }
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;
    Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            if (updatedPerson) return res.json(updatedPerson);
            else {
                const error = new Error('Person not found.');
                error.name = 'NotFoundError';
                next(error);
            }
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
    const date = new Date();
    Person.count()
        .then(result => {
            const html = `<p>Phonebook has info for ${result} people.</p>
                  <p>${date.toString()}</p>`;
            res.send(html);
        })
        .catch(error => next(error));
});

app.use((req, res, next) => {
    const error = new Error('Unknown endpoint.');
    error.name = 'NotFoundError';
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    switch (error.name) {
        case 'CastError':
            res.statusCode = 400;
            error.message = 'Malformatted ID.';
            break;
        case 'ValidationError':
            res.statusCode = 400;
            break;
        case 'BadRequestError':
            res.statusCode = 400;
            break;
        case 'NotFoundError':
            res.statusCode = 404;
            break;
        default:
            res.statusCode = 500;
            error.message = 'Internal server error.';
    }
    res.json({ error: error.message });
    next(error);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});