import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPrivate from "../private/headerPrivate/HeaderPrivate";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../footer/Footer";

const UserLayout = () => {
  const { auth, loading } = useAuth();
  const { role } = auth;

  console.log(typeof role)

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        <HeaderPrivate />

        <main className="bg-dark min-h-screen text-txt-grey flex items-center">
          {role == "ROLE_USER" ? <Outlet /> : <Navigate to="/login" />}
          {/* {true && false ? <Outlet /> : <Navigate to="/login" />} */}
        </main>
        <Footer />
      </>
    );
  }
};

export default UserLayout;
