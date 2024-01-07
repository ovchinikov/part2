import { useState } from "react";

// Filter component

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <h2>Filter</h2>
      <input type="text" onChange={handleFilterChange} />
    </div>
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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);

    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);

    setPhone(event.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      phone: phone,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setPhone("");
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

  return (
    <div>
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
