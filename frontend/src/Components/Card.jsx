import React from 'react'

const Card = ({item}) => {
  return (
    <div>
      <img src={item.images[0].url_image} alt="" />
      <h2>{item.name}</h2>
      <h3>{item.description}</h3>
    </div>
  )
}

export default Card