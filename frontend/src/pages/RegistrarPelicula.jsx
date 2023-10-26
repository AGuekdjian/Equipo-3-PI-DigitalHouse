import React from "react";

export function RegistrarPelicula() {
  return (
    <div>
      <h1>Registrar nueva pelicula</h1>
      <form action="">
        <div className="movieInput">
          <label htmlFor="movieName">Nombre de la pelicula</label>
          <input type="text" name="" id="movieName" />
        </div>

        <div className="movieInput">
          <label htmlFor="genre">Genero de la pelicula</label>
          <input type="text" name="" id="genre" />
        </div>

        <div className="movieInput">
          <label htmlFor="length">Duración de la pelicula</label>
          <input type="text" name="" id="length" />
        </div>

        <div className="movieInput">
          <label htmlFor="image">
            Agregue una o más imagenes de la película
          </label>
          <input type="file" name="" id="image" />
        </div>

        <button type="submit"> Enviar </button>

        {/* PENDIENTE DE AGREGAR MÁS INPUTS, AGUARDANDO A BACKEND */}
      </form>
    </div>
  );
}
