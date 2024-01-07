import { useEffect, useState } from "react";
import axios from "axios";
import personsService from "./services/personsService";
import "./index.css";

// Filter component

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <h2>Filter</h2>
      <input type="text" onChange={handleFilterChange} />
    </div>
  );
};

const Notification = ({ message }) => {
  // should return success and error messages
  if (message === null) {
    return null;
  }
  return (
    // check if message is success or error
    <div className={message.type}>{message.text}</div>
  );
};

// PersonForm component

const PersonForm = ({
  addPerson,
  newName,
  phone,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input type="tel" value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

// persons component

const Persons = ({ persons, setPersons, setMessage }) => {
  const handleDelete = (id, name) => {
    return () => {
      const confirm = window.confirm(
        `Are you sure you want to delete ${name}?`
      );
      if (confirm) {
        personsService.deletePerson(id).then((res) => {
          console.log(res.data);
          setMessage({
            text: `Succesfully Removed  ${name} credentials from our records`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);

          personsService.getAll().then((res) => {
            console.log(res.data);
            setPersons(res.data);
          });
        });
      } else {
        return;
      }
    };
  };
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.phone}
            <button onClick={handleDelete(person.id, person.name)}>
              Delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState({ text: null, type: null });

  useEffect(() => {
    personsService.getAll().then((res) => {
      console.log(res.data);
      setPersons(res.data);
    });
  }, []);

  // handle Name change function
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  // Add person function
  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      id: Math.floor(Math.random() * 1000), // give person random id btn 1-1000
      name: newName,
      phone: phone,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personsService.create(personObject).then((res) => {
        console.log(res);
        setPersons(persons.concat(personObject));
        // set success message and remove it after 3 seconds
        setMessage({
          text: `Added ${newName}`,
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        setNewName("");
        setPhone("");
      });
    }

    // check if person already exists function
    if (persons.find((person) => person.phone === phone)) {
      const person = persons.find((person) => person.phone === phone);
      const confirm = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const changedPerson = { ...person, phone: phone };
        personsService
          .update(person.id, changedPerson)
          .then((res) => {
            console.log(res.data);
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : res.data
              )
            );
            setNewName("");
            setPhone("");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    }
  };
  // filter people by name

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    if (filterValue === "") {
      setPersons(persons);
    } else {
      setPersons(filteredPersons);
    }

    console.log(filteredPersons);
  };

  // handleDelete function

  return (
    <div>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add Contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        phone={phone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setMessage={setMessage}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
