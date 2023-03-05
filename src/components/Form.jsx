import React from 'react'
import { useState } from 'react'

function Form({ handleAddPerson }) {
    const [newName, setNewName] = useState({ name: '', number: '' })
    const handleChange = (event) => { 
        setNewName({ ...newName, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => { 
        event.preventDefault();
        handleAddPerson(newName)
        setNewName({ name: '', number: '' })
    }
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" value={newName.name} onChange={handleChange} /> <br />
          number: <input name="number" value={newName.number} onChange={handleChange}  type="text" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default Form