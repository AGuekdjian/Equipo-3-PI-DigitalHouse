import { useEffect, useState } from "react";
import "./FormBusquedaPelicula.css";



const FormBusquedaPelicula = ({ onSubmit, onChange, search, movies, error }) => {

  const [moviesTitle, setMoviesTitle] = useState([])

  useEffect(() => {
    console.log(movies);
    if (movies.content) {
      setMoviesTitle(movies.content.map((movie) => (
        movie ? <li className="hover:bg-gray-700 cursor-pointer w-72 text-left p-1" key={movie.id} onClick={() => onChange({ target: { value: movie.title } })} >{movie.title}</li> : null
      )))
    }
  }, [movies])


  return (
    <section className="flex text-center flex-col w-3/12 mt-8 search-styles-mobile">
      <h1 className="font-extrabold text-2xl">Buscar Pelicula</h1>

      <form onSubmit={onSubmit}  className="flex flex-col items-center">
        <div className="mt-2 search-input-container">
          {/* <input type="text" placeholder='Seleccione su ubicación' /> */}
          <input
            className="py-2 px-4 rounded-pill w-72 bg-grey-light"
            type="text"
            name="search"
            placeholder="Seleccione la pelicula"
            onChange={(e) => onChange(e)}
            value={search}
          />
          <ul className="w-72 bg-black">
            {moviesTitle.length > 0 ? moviesTitle : null}
            {error ? <li>{error}</li> : null}
          </ul>

          <button type="submit" className="btn mt-3 py-2 px-4 bg-sky text-dark rounded-pill font-extrabold ml-2">
            Buscar
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormBusquedaPelicula;
