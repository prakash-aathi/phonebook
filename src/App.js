import { useState,useEffect } from 'react'
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import Phonebook from './services/Phonebook';
import phonebook from './services/Phonebook';
import Notification from './components/Notification';

const App = () => {
//  store data when adding new person
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: "1001" }]);
// render data when filtering or adding new person
  const [render, setRender] = useState(persons);
// store data when filtering
  const [filter, setFilter] = useState({ name: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phonebook.getAll().then(response => {
      setPersons(response);
      setRender(response);
    });
  }, [])
  
  const handleSubmit = (newName) => {
    if (persons.some(person => person.name === newName.name)) {
      if (window.confirm(`${newName.name} is already added to the phonebook, replace the old number with a new one?`)) { 
        const id = persons.find(person => person.name === newName.name).id;
        phonebook.update(id, newName).then(response => {
          const data = persons.filter(person => person.id !== id);
          setPersons(data.concat(response));
          setRender(data.concat(response));
        }).catch(error => { 
          setErrorMessage({"status": "failure", "content": `Information of ${newName.name} has already been removed from server`});
          setTimeout(() => { 
            setErrorMessage(null);
          }, 3000);
        });
      }
      return;
    }

    Phonebook.create(newName).then(response => {
      setPersons(persons.concat(response));
      setRender(persons.concat(response));
      console.log(response);
      setErrorMessage({"status": "sucess", "content": `Added ${response.name}`});
      setTimeout(() => { 
        setErrorMessage(null);
      }, 3000);
    })
    console.log("after add render ",render);
  };

  const handleFilter = (event) => {
    setFilter({ name: event.target.value });
    const filterResult = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    filterResult.length === 0 ? setRender(persons) : setRender(filterResult);
    console.log("Filter Results",filterResult);
  }

  const handleDelete = (id) => {
    console.log(id);
    const name = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${name} ?`)) {
      phonebook.deletePerson(id)
        .then(res => {
          const data = (render.filter(ren => ren.id !== id))
          setPersons(data)
          setRender(data)
        }).catch(error => { 
          setErrorMessage({"status": "failure", "content": `Information of ${name} has already been removed from server`});
          setTimeout(() => { 
            setErrorMessage(null);
          }, 3000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={errorMessage}></Notification>
      <Filter filter={filter.name} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <Form handleAddPerson={handleSubmit}  />

      <h2>Numbers</h2>
      <Persons render={render} handleDelete={handleDelete} />
      
    </div>
  );
};

export default App;