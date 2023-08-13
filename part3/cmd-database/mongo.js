const mongoose = require('mongoose');

const password = process.argv[2];

if (!password) {
    console.log('Please provide a password.');
    process.exit(1);
}

const name = process.argv[3];
const number = process.argv[4];

if (!name != !number) {
    console.log('Missing data.');
    process.exit(1);
}

const url =
    `mongodb+srv://dev-gastropodo:${password}@gastropodo-test.aeelx7p.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

if (name) {
    const person = new Person({ name, number });

    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook.`)
        mongoose.connection.close()
    });

} else {
    Person.find({}).then(result => {
        console.log(`Phonebook:`);
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

