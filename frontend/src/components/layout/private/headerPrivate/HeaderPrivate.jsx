import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import Logo from "/logo.svg";
import avatar from "../../../../assets/img/user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const HeaderPrivate = () => {
  const [route, setRoute] = useState("");
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.role == "ROLE_USER") {
      setRoute("user");
    } else {
      setRoute("admin");
    }
  }, []);

  return (
    <>
      <header className="bg-sky-light w-full h-16 flex justify-around items-center header-desktop-private">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-14" />
          </Link>
          <h1 className="mx-4 text-xl font-extrabold">
            "Tu busqueda, nuestro compromiso, tu cine."
          </h1>
        </div>

        <nav className="flex justify-center items-center">
          <ul className="flex mx-8">
            <li className="menu-list__item">
              <NavLink to="/" className="flex items-center">
                <i className="fa-solid fa-house"></i>
                <span className="ml-2.5">Inicio</span>
              </NavLink>
            </li>

            {route == "user" ? (
              <li className="ml-6">
                <NavLink to={`/${route}/reserve`} className="flex items-center">
                  <i className="fa-solid fa-list"></i>
                  <span className="ml-2.5">Reservar</span>
                </NavLink>
              </li>
            ) : (
              <li className="ml-6">
                <NavLink
                  to={`/${route}/dashboard`}
                  className="flex items-center"
                >
                  <i className="fa-solid fa-list"></i>
                  <span className="ml-2.5">Dashboard</span>
                </NavLink>
              </li>
            )}
          </ul>

          <div className="flex items-center">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className="border-none"
            >
              <DropdownToggle caret className="border-none flex items-center">
                <img src={avatar} className="w-12" alt="Imagen de perfil" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  {route == "user" ? (
                    <NavLink
                      to={`/${route}/profile`}
                      className="flex items-center"
                    >
                      <i className="fa-solid fa-user"></i>
                      <span className="ml-2.5">Perfil</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/${route}/profile`}
                      className="flex items-center"
                    >
                      <i className="fa-solid fa-user"></i>
                      <span className="ml-2.5">Perfil</span>
                    </NavLink>
                  )}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {route == "user" ? (
                    <NavLink
                      to={`/${route}/settings`}
                      className="flex items-center"
                    >
                      <i className="fa-solid fa-gear"></i>
                      <span className="ml-2.5">Ajustes</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/${route}/settings`}
                      className="flex items-center"
                    >
                      <i className="fa-solid fa-gear"></i>
                      <span className="ml-2.5">Ajustes</span>
                    </NavLink>
                  )}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {route == "user" ? (
                    <NavLink
                      to={`/${route}/logout`}
                      className="flex items-center"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span className="ml-2.5">Cerrar Sesion</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/${route}/logout`}
                      className="flex items-center"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span className="ml-2.5">Cerrar Sesion</span>
                    </NavLink>
                  )}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </nav>
      </header>

      <header className="header-mobile-private">
        <Navbar className="bg-sky-light" light>
          <NavbarBrand href="/" className="me-auto">
            <img src={Logo} alt="logo" className="h-14" />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar className="mt-2 navbar-mobile">
              <NavItem className="border-b-[1px] py-2">
                {route == "user" ? (
                  <NavLink
                    to={`/${route}/profile`}
                    className="flex items-center"
                  >
                    <i className="fa-solid fa-user"></i>
                    <span className="ml-2.5">Perfil</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to={`/${route}/profile`}
                    className="flex items-center"
                  >
                    <i className="fa-solid fa-user"></i>
                    <span className="ml-2.5">Perfil</span>
                  </NavLink>
                )}
              </NavItem>
              <NavItem className="border-b-[1px] py-2">
                {route == "user" ? (
                  <NavLink
                    to={`/${route}/settings`}
                    className="flex items-center"
                  >
                    <i className="fa-solid fa-gear"></i>
                    <span className="ml-2.5">Ajustes</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to={`/${route}/settings`}
                    className="flex items-center"
                  >
                    <i className="fa-solid fa-gear"></i>
                    <span className="ml-2.5">Ajustes</span>
                  </NavLink>
                )}
              </NavItem>
              <NavItem className="mt-2">
                {route == "user" ? (
                  <NavLink
                    to={`/${route}/logout`}
                    className="flex items-center"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="ml-2.5">Cerrar Sesion</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to={`/${route}/logout`}
                    className="flex items-center"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="ml-2.5">Cerrar Sesion</span>
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    </>
  );
};

export default HeaderPrivate;
