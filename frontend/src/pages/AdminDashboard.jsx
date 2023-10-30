import React from "react";
import { Link } from "react-router-dom";



export function AdminDashboard() {
  return (
    <div>
      <h1>Bienvenido al panel de administración!</h1>
      <Link to={"/administracion/listadoproductos"}> <button>Lista de productos</button></Link>
      <Link to={"/peliculanueva"}> <button>Agregar producto nuevo</button></Link>
    </div>
  );
}
