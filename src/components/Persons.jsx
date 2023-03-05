import React from 'react'

const Persons = ({ render, handleDelete }) => {

  return (
      <>
          {render.map((person,index) => (
            <p key={index}>{person.name} {person.number}
               <button  onClick={()=>handleDelete(person.id)} >delete</button>
            </p>
      ))}
      </>
  )
}

export default Persons