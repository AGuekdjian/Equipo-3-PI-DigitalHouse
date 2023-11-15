import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  RegistrarPelicula,
  Reserve,
  Detail,
  AdminDashboard,
  Error404,
  Logout,
  Gallery,
  ListaPeliculas,
  EditarPelicula,
  Setting,
  Profile,
  EditarUsuario,
  EliminarUsuario,
  AgregarUsuario,
  ListUsers,
} from "../pages";
import { PrivateLayout, PublicLayout, UserLayout } from "../components/layout";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/page/:pageNumber" element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/images/:id" element={<Gallery />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* <Route path="detail/images/:id" element={<Profile />} /> */}

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="page/:pageNumber" element={<Home />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/images/:id" element={<Gallery />} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="page/:pageNumber" element={<Home />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/images/:id" element={<Gallery />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard/movies" element={<ListaPeliculas />} />
          <Route path="dashboard/user" element={<ListUsers />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
