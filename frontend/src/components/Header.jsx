import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";

export const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <img src={Logo} alt="logo" />
      </Link>

      <div>
        <button>Crear cuenta</button>

        <button>Iniar sesión</button>
      </div>
    </header>
  );
};

export default Header;
