import { useEffect, useState } from 'react';
import personsService from './services/personsService';
import Persons from './components/persons';
import PersonForm from './components/personForm';
import Filter from './components/Filter';
import Notification from './components/notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phone, setPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    personsService.getAll().then((res) => {
      console.log(res.data);
      setPersons(res.data);
    });
  }, []);

  const reset = () => {
    setNewName('');
    setPhone('');
  };

  const notifyMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const updatePerson = (person) => {
    const prompt = window.confirm(
      `${newName} is already added to phonebook, replace the number?`,
    );
    if (prompt) {
      personsService
        .update(person.id, { ...person, number: phone })
        .then((res) => {
          setPersons(
            persons.map((person) =>
              person.id !== person.id ? person : res.data,
            ),
          );
          notifyMessage(`phone number of ${person.name} updated!`, 'success');
        })
        .catch(() => {
          notifyMessage(`${person.name} has already been removed`, 'error');
          setPersons(persons.filter((person) => person.id !== person.id));
        });

      reset();
    }
  };

  const removePerson = (person) => {
    const prompt = window.confirm(`remove ${person.name} from phonebook?`);
    if (prompt) {
      personsService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((person) => person.id !== person.id));
        notifyMessage(`${person.name} removed!`, 'success');
      });
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      updatePerson(person);
      return;
    }

    personsService
      .create({
        name: newName,
        number: phone,
      })
      .then((res) => {
        setPersons(persons.concat(res.data));

        notifyMessage(`${newName} added!`, 'success');

        reset();
      })
      .catch((err) => {
        notifyMessage(err.response.data.error, 'error');
      });
  };

  const filterQuery = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  const filteredPersons = filter ? persons.filter(filterQuery) : persons;

  return (
    <div>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add Contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={phone}
        setNewName={setNewName}
        setNewNumber={setPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
