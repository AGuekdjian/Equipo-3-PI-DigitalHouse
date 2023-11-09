import React from "react";
import { Routes, Route } from "react-router-dom";
import {
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
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="reservar" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/images/:id" element={<Gallery />} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="page/:pageNumber" element={<Home />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="newmovie" element={<RegistrarPelicula />} />
          <Route path="reservar" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/images/:id" element={<Gallery />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard/movies" element={<ListaPeliculas />} />
          <Route path="dashboard/movies/update" element={<EditarPelicula />} />
          <Route path="dashboard/user/update" element={<EditarUsuario />} />
          <Route path="dashboard/user/delete" element={<EliminarUsuario />} />
          <Route path="dashboard/user/create" element={<AgregarUsuario />} />
          <Route path="dashboard/user" element={<ListUsers />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
