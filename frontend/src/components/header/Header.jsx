import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <>
      <header className="bg-sky-light w-full h-16 flex justify-around items-center header-desktop">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-14" />
          </Link>
          <h1 className="mx-4 text-xl font-extrabold">
            "Tu busqueda, nuestro compromiso, tu cine."
          </h1>
        </div>

        <nav>
          <ul className="flex justify-between w-72">
            <li>
              <Link
                to="/register"
                className="py-2 px-4 bg-sky rounded-xl btn-signup"
              >
                Crear cuenta
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="py-2 px-4 bg-sky rounded-xl btn-login"
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <header className="header-mobile">
        <Navbar className="bg-sky-light" light>
          <NavbarBrand href="/" className="me-auto">
            <img src={Logo} alt="logo" className="h-14" />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar className="mt-2 navbar-mobile">
              <NavItem className="mb-4">
                <Link
                  to="/login"
                  className="py-2 px-4 bg-sky rounded-xl btn-login"
                >
                  Iniciar sesión
                </Link>
              </NavItem>
              <NavItem className="mb-2">
                <Link
                  to="/register"
                  className="py-2 px-4 bg-sky rounded-xl btn-signup"
                >
                  Crear cuenta
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
