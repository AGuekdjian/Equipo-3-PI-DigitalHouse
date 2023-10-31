import React from "react";
import "./FormBusquedaPelicula.css";

const FormBusquedaPelicula = () => {
  return (
    <section className="flex text-center flex-col w-3/12 mt-8 search-styles-mobile">
      <h1 className="font-extrabold text-2xl">Buscar Pelicula</h1>

      <div className="mt-2 search-input-container">
        {/* <input type="text" placeholder='Seleccione su ubicación' /> */}
        <input
          className="py-2 px-4 rounded-pill w-72 bg-grey-light"
          type="text"
          placeholder="Seleccione la pelicula"
        />
        <button className="btn py-2 px-4 bg-sky text-dark rounded-pill font-extrabold ml-2">
          Buscar
        </button>
      </div>
    </section>
  );
};

export default FormBusquedaPelicula;
