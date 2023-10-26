import React from 'react'
import Logo from "/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const fechaActual = new Date();
  const yearNow = fechaActual.getFullYear();
  return (
    <footer className='p-3 bg-sky-light w-full font-bold flex  h-16 items-center'>
      <Link to="/">
        <img src={Logo} alt="logo" className="h-14" />
      </Link>
      <p>Copyright&copy;{` ${yearNow} - CINESEARCHPRO`}</p>
    </footer>
  )
}

export default Footer