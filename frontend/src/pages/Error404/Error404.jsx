import React from "react";
import { Link } from "react-router-dom";

export function Error404() {
  return (
    <section>
      <h1>Error 404: Pagina no encontrada.</h1>
      <Link to="/">Volver a la pagina principal.</Link>
    </section>
  );
}
