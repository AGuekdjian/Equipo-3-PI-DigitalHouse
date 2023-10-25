import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({item}) => {
  return (
    <div>
      <img src={item.images[0].url_image} alt="" />
      <h2>{item.name}</h2>
      <h3>{item.description}</h3>
      <Link to={`/detail/${item.id}`}> <button> Más detalle </button> </Link>
    </div>
  )
}

export default Card

