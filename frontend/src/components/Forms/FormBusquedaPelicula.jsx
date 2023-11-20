import React, { useEffect } from "react";
import "./FormBusquedaPelicula.css";
import { useState } from "react";

const FormBusquedaPelicula = ({ onSearch }) => {

  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(search)

  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    const newSearch = e.target.value;

    if (newSearch === "") {
      setError("Por favor ingrese una pelicula")
    }

    if (newSearch.length < 3) {
      setError("Por favor ingrese una pelicula mayor a 3 caracteres")
    }

    setError(null)
  }

  useEffect(() => {

  })


  return (
    <section className="flex text-center flex-col w-3/12 mt-8 search-styles-mobile">
      <h1 className="font-extrabold text-2xl">Buscar Pelicula</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-2 search-input-container">
          {/* <input type="text" placeholder='Seleccione su ubicación' /> */}
          <input
            className="py-2 px-4 rounded-pill w-72 bg-grey-light"
            type="text"
            name="search"
            placeholder="Seleccione la pelicula"
            onChange={handleChange}
            value={search}
          />
          <button type="submit" className="btn py-2 px-4 bg-sky text-dark rounded-pill font-extrabold ml-2">
            Buscar
          </button>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default FormBusquedaPelicula;
