import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import RegistrarPelicula from "../pages/RegistrarPelicula";
import Reserve from "../pages/Reserve";
import Signup from "../pages/Signup";
import Error404 from "../pages/Error404/Error404";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="peliculanueva" element={<RegistrarPelicula />} />
          <Route path="reservar" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="administracion" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
