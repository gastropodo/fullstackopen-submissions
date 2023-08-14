const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('Connecting to database...');

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must have be least 3 characters.'],
        required: [true, 'Name is required.']
    },
    number: {
        type: String,
        required: [true, 'Phone number is required.'],
        minLength: [8, 'Phone number must be at least 8 characters.'],
        validate: {
            validator: value => {
                return /^\d{2,3}-\d+$/.test(value);
            },
            message: ({ value }) => `${value} is not a valid phone number.`
        }
    },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);