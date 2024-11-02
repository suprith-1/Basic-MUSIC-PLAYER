import React from 'react'
import './card.css';
const Card = (props) => {
  return (
    <div className='main'>
      {props.children}
    </div>
  )
}

export default Card
