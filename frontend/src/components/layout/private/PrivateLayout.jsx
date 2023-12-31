import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPrivate from "./headerPrivate/HeaderPrivate";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../footer/Footer";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const { role } = auth;

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        <HeaderPrivate />

        <main className="bg-dark min-h-screen text-txt-grey flex ">
          {role == "ROLE_ROOT" || role == "ROLE_ADMIN" ? (
            <Outlet />
          ) : (
            <Navigate to="/login" />
          )}
          {/* {true ? <Outlet /> : <Navigate to="/login" />} */}
        </main>
        <Footer />
      </>
    );
  }
};

export default PrivateLayout;
