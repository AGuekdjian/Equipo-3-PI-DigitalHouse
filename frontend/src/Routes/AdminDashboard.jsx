import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
      <h1>Bienvenido al panel de administración!</h1>
      <Link to={"/productonuevo"} >Agregar producto</Link>
    </div>
  )
}

export default AdminDashboard