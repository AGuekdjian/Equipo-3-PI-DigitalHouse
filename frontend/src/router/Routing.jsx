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
        <Route path="detail/images/:id" element={<Gallery />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
