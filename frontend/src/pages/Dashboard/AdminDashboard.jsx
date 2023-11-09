import React from "react";
import { Link } from "react-router-dom";



export function AdminDashboard() {
  return (
    <div>
      <h1>Bienvenido al panel de administración!</h1>
      <Link to={"/admin/dashboard/movies"}> <button>Lista de productos</button></Link>
      <Link to={"/admin/newmovie"}> <button>Agregar producto nuevo</button></Link>
    </div>
  );
}
