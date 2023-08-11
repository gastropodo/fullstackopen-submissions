import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Persons from './components/Persons';
import Input from './components/Input';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState({ type: null, message: null });

    const raiseNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification({ type: null, message: null })
        }, 5000);
    }

    const addPerson = (event) => {
        event.preventDefault();
        const person = persons.find(({ name }) => name === newName);

        if (!newName.match(/\S/g) || !newNumber.match(/\S/g)) {
            alert('Name or number cannot be blank.')
        } else if (person) {
            const message = `${newName} is already added to the phonebook. replace old number with the new one?`;
            if (window.confirm(message)) {
                const id = person.id;
                personsService.updatePerson(id, { ...person, number: newNumber })
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
                        raiseNotification('success', `Updated ${returnedPerson.name} successfully.`)
                    })
            }
        } else {
            personsService.addPerson({
                name: newName,
                number: newNumber
            }).then(newPerson => {
                setPersons(persons.concat(newPerson));
                setNewName('');
                raiseNotification('success', `Added ${newPerson.name} successfully.`);
            });
        }
    }

    const deletePerson = (id) => {
        const person = persons.find(person => person.id === id);
        if (person) {
            if (window.confirm(`Delete ${person.name}?`)) {
                personsService.deletePerson(id)
                    .then(() => {
                        raiseNotification('success', `Deleted ${person.name} successfully.`);
                    })
                    .catch(error => {
                        console.log(error);
                        raiseNotification('error', `The information of ${person.name} has already been removed from server.`);
                    })
                    .finally(() => {
                        setPersons(persons.filter(person => person.id !== id));
                    });
            }
        } else {
            raiseNotification('error', `Person does not exist!`);
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const personsToShow = persons.filter(person => {
        return person.name.toLowerCase().match(filter.toLowerCase());
    });

    useEffect(() => {
        personsService.getPersons().then(persons => setPersons(persons));
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification type={notification.type} message={notification.message} />
            <Input text="filter shown with" handler={{ value: filter, onChange: handleFilterChange }} />
            <h3>Add a new</h3>
            <PersonForm
                nameHandler={{ value: newName, onChange: handleNameChange }}
                numberHandler={{ value: newNumber, onChange: handleNumberChange }}
                onSubmit={addPerson} />
            <h3>Numbers</h3>
            <Persons persons={personsToShow} handleDelete={deletePerson} />
        </div>
    )
}

export default App;
