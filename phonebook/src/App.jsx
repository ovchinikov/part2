import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
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

  // add phone number

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
