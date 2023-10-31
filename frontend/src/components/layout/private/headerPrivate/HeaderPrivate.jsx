import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/headerPublic/Header.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

export const HeaderPrivate = () => {
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

        <nav className="navbar__container-lists">
          <ul className="container-lists__menu-list">
            <li className="menu-list__item">
              <NavLink to="/">
                <i className="fa-solid fa-house"></i>
                <span className="menu-list__title">Inicio</span>
              </NavLink>
            </li>

            <li className="menu-list__item">
              <NavLink to="/administracion">
                <i className="fa-solid fa-list"></i>
                <span className="menu-list__title">AdminDashboard</span>
              </NavLink>
            </li>
          </ul>

          <ul className="container-lists__list-end">
            <li className="list-end__item">
              <NavLink
                to={`/social/profile/${auth._id}`}
                className="list-end__link-image"
              >
                {image != "default.png" ? (
                  <img
                    src={`${Global.url}user/avatar/${image}`}
                    className="list-end__img"
                    alt="Imagen de perfil"
                  />
                ) : (
                  <img
                    src={avatar}
                    className="list-end__img"
                    alt="Imagen de perfil"
                  />
                )}
              </NavLink>
            </li>
            <li className="list-end__item">
              <NavLink
                to={`/social/profile/${auth._id}`}
                className="list-end__link"
              >
                <span className="list-end__name">{`${nick}`}</span>
              </NavLink>
            </li>
            <li className="list-end__item">
              <NavLink to="/social/settings">
                <i className="fa-solid fa-gear"></i>
                <span className="list-end__name">Ajustes</span>
              </NavLink>
            </li>
            <li className="list-end__item">
              <NavLink to="/social/logout" className="list-end__link">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="list-end__name">Cerrar Sesion</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div>
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
        </div>
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

export default HeaderPrivate;
