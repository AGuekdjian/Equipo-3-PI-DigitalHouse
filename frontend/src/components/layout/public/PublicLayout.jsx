import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPublic from "./headerPublic/HeaderPublic";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../footer/Footer";

const PublicLayout = () => {
  const { auth } = useAuth();
  const { _id } = auth;
  return (
    <>
      <HeaderPublic />

      <main className="bg-dark min-h-screen text-txt-grey">
        {!_id ? <Outlet /> : <Navigate to="/social" />}
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;
