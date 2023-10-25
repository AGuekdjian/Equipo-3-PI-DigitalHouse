import React from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    
    <>
        <Link to={'/'}>
            <img src="../static/logo.svg" alt="logo" />
        </Link>
        
        <div>
            <button>Crear cuenta</button>

            <button>Iniar sesión</button>
        </div>

    </>

  )
}

export default Navbar
