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
  EditarProducto,
  Setting,
  Profile,
} from "../pages";
import Home from "../pages/home/Home";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import PublicLayout from "../components/layout/public/PublicLayout";

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

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="newmovie" element={<RegistrarPelicula />} />
          <Route path="reservar" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/images/:id" element={<Gallery />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard/movies" element={<ListaPeliculas />} />
          <Route
            path="dashboard/movies/update"
            element={<EditarProducto />}
          />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;