import React from 'react'

function Filter({filter, handleFilter}) {
  return (
    <div>
        filter shown with  <input name='filter'  value={filter} onChange={handleFilter} />
    </div>
  )
}

export default Filter