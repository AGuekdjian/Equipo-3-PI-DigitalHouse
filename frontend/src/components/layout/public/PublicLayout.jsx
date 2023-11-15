import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPublic from "./headerPublic/HeaderPublic";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../footer/Footer";

const PublicLayout = () => {
  const { auth } = useAuth();
  const { role } = auth;
  const [route, setRoute] = useState("");

  useEffect(() => {
    if (role === "ROLE_ROOT" || role === "ROLE_ADMIN") {
      setRoute("/admin");
    } else if (role === "ROLE_USER") {
      setRoute("/user");
    } else {
      setRoute("/");
    }
  }, [role]);

  return (
    <>
      <HeaderPublic />

      <main className="bg-dark min-h-screen text-txt-grey flex items-center">
        {!role ? <Outlet /> : <Navigate to={route} />}
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;
