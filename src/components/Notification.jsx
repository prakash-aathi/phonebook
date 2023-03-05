import React from 'react'

const Notification = ({ msg }) => {
  console.log(msg);
  if (msg === null) {
      return null
  }

  return (
      <div className={msg.status}> { msg.content  }</div>
  )
}

export default Notification