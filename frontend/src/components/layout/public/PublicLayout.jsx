import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPublic from "./headerPublic/HeaderPublic";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../footer/Footer";

const PublicLayout = () => {
  const { auth } = useAuth();
  const { email } = auth;
  const [route, setRoute] = useState('')

  useEffect(() => {
    if(auth.role == "ROLE_USER") {
      setRoute("user")
    } else {
      setRoute("admin")
    }
  },[])

  return (
    <>
      <HeaderPublic />

      <main className="bg-dark min-h-screen text-txt-grey flex items-center">
        {/* {false ? <Outlet /> : <Navigate to="/admin" />} */}
        {!email ? <Outlet /> : <Navigate to={`/${route}`} />}
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;
