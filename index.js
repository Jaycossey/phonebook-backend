// import express, morgan and cors
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// port number
const PORT = process.env.PORT || 3001;
// json parser for POST requests
app.use(express.json());
// allow cors for communication of front and back end
app.use(cors());

// morgan tiny format
app.use(morgan('tiny'));
app.use(express.static('dist'));

// generate ID funtion
const generateId = () => {
    // generate random ID value
    const id = Math.floor(Math.random() * 10000);
    return id;
}

// checks if name exists in database
const checkExists = (bodyName) => {
    return data.find(person => {
        return person.name === bodyName;
    });
}

// phonebook data
let data = [
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
];

// default page
app.get('/', (req, res) => {
    res.send('<h1>Hello Phonebook</h1>');
});

// get all data
app.get('/api/persons', (req, res) => {
    res.json(data);
});

// send date to the screen: time of req and length of phonebook
app.get('/info', (req, res) => {
    const date = new Date();
    const len = data.length;

    res.send(`
        <h1>Phone book has info for ${len} people</h1>
        <p>${date}</p>
    `);
});

// fetch single persons data
app.get('/api/persons/:id', (req, res) => {
    // assign and find person by ID number
    const id = Number(req.params.id);
    const person = data.find(person => {
        return person.id === id;
    });

    // if person doesnt exist
    if (!person) {
        res.status(404).end();
    }
    // else return person
    res.json(person);
});

// delete single person from phonebook
app.delete('/api/persons/:id', (req, res) => {
    // filter array by ID number
    const id = Number(req.params.id);
    person = data.filter(person => person.id !== id);
    // status code
    res.status(204).end();
});

// add new entries
app.post('/api/persons', (req, res) => {
    // body is sent in request
    const body = req.body;

    // if content doesnt exist
    if (!body) {
        return res.status(400).json({error: `content missing`});
    }

    // if content doesnt exist
    if (!body.name) {
        return res.status(400).json({error: `name missing`});
    }
    
    // if content doesnt exist
    if (!body.number) {
        return res.status(400).json({error: `number missing`});
    }

    // if name already exists
    if (checkExists(body.name)) {
        return res.status(501).json({error: `Person already exists`});
    }

    // assign new person obj
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    // concatenate the data array and add person
    data = data.concat(person);
    // response sends json of person 
    res.json(person);
})

// Listen to port for requests
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});