import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Reserve,
  Detail,
  AdminDashboard,
  Error404,
  Logout,
  Gallery,
  ListaPeliculas,
  Setting,
  Profile,
  ListUsers,
  NewReserve,
  ReservaConfirmada,
} from "../pages";
import { PrivateLayout, PublicLayout, UserLayout } from "../components/layout";
import { Favorite } from "../pages/Favorite";
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
          <Route path="reservaConfirmada" element={<Reserve />} />
          <Route path="reserve" element={<ReservaConfirmada />} />
          <Route path="favmovies" element={<Favorite />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/reserve/:id" element={<NewReserve />} />
          <Route path="detail/images/:id" element={<Gallery />} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard/movies" element={<ListaPeliculas />} />
          <Route path="dashboard/user" element={<ListUsers />} />
          <Route path="userHome" element={<Home />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
          <Route path="reservaConfirmada" element={<ReservaConfirmada />} />
          <Route path="profile" element={<Profile />} />
          <Route path="favmovies" element={<Favorite />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/reserve/:id" element={<NewReserve />} />
          <Route path="detail/images/:id" element={<Gallery />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
