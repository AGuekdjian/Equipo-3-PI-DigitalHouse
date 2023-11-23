import { useEffect, useState } from "react";
import "./FormBusquedaPelicula.css";
import DatePickerComponent from "../datePickerComponent/DatePickerComponent";

const FormBusquedaPelicula = ({
  onSubmit,
  onChange,
  search,
  movies,
  error,
}) => {
  const [moviesTitle, setMoviesTitle] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(document.activeElement)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    if (movies.content) {
      setMoviesTitle(
        movies.content.map((movie) =>
          movie ? (
            <li
              className="hover:bg-gray-700 cursor-pointer w-72 text-left p-1"
              key={movie.id}
              onMouseDown={() => onChange({ target: { value: movie.title } })}
            >
              {movie.title}
            </li>
          ) : null
        )
      );
    }
  }, [movies]);

  return (
    <section className="flex text-center flex-col w-3/12 mt-8 search-styles-mobile">
      <h1 className="font-extrabold text-2xl">Buscar Pelicula</h1>

      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className="mt-2 search-input-container flex flex-row items-center" onBlur={handleBlur}>
          <div>
            <input
              className="py-2 px-4 rounded-pill w-72 bg-grey-light mr-2"
              type="text"
              name="search"
              placeholder="Seleccione la pelicula"
              onChange={(e) => {
                onChange(e)
                setShowList(true);  
              }
              }
              value={search}
              autoComplete="off"
            />
            {showList && (
            <ul className="w-72 bg-black absolute z-10">
              {moviesTitle.length > 0 ? moviesTitle : null}
              {error ? <li>{error}</li> : null}
            </ul>
          )}
          </div>
          <DatePickerComponent />

          <button
            type="submit"
            className="btn py-2 px-4 bg-sky text-dark rounded-pill font-extrabold"
          >
            Buscar
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormBusquedaPelicula;
