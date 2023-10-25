import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";

export const Navbar = () => {
  return (
    <>
      <Link to={"/"}>
        <img src={Logo} alt="logo" />
      </Link>

      <div>
        <button>Crear cuenta</button>

        <button>Iniar sesión</button>
      </div>
    </>
  );
};

export default Navbar;
