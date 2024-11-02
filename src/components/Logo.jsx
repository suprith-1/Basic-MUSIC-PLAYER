import React from 'react'
import './Logo.css';
const logo = (props) => {
  return (
    <div>
      <img src={props.imgsrc} />
      <div className="des">
        <h4 id='title'>{props.name}</h4>
        <h4 id='artist'>{props.artist}</h4>
      </div>
    </div>
  )
}

export default logo
