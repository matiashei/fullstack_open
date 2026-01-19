import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const RenderNumbers = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button></div>)}
    </div>
  )
}

const Filter = ({ showFiltered, onChange }) => {
  return (
    <div>
      filter shown with <input value={showFiltered} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (preventDuplicate(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

    const removePerson = (id) => {
      const person = persons.find(p => p.id === id)
      personService
        .remove(id, person.name)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = event => {
      setNewNumber(event.target.value)
    }

    const preventDuplicate = (name) => {
      return persons.find(person => person.name === name)
    }

    const personsToShow = showFiltered
      ? persons.filter(person => person.name.toLowerCase().includes(showFiltered.toLowerCase()))
      : persons

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter showFiltered={showFiltered} onChange={setShowFiltered} />
        <h2>Add a new</h2>
        <PersonForm
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <RenderNumbers personsToShow={personsToShow} removePerson={removePerson} />
      </div>
    )

  }

  export default App