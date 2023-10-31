import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Home,
  Register,
  RegistrarPelicula,
  Reserve,
  Detail,
  AdminDashboard,
  Error404,
  Logout,
  Gallery
} from "../pages";
import ListaProductos from "../pages/ListaProductos";
import EditarProducto from "../pages/EditarProducto";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route path="peliculanueva" element={<RegistrarPelicula />} />
        <Route path="reservar" element={<Reserve />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="administracion" element={<AdminDashboard />} />
        <Route path="administracion/listadoproductos" element={<ListaProductos/>} />
        <Route path="administracion/listadoproductos/editarproducto" element={<EditarProducto/>} />
        <Route path="detail/images/:id" element={<Gallery />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
