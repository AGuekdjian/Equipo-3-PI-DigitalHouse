import { useRef, useState, useCallback } from "react";
import { searchMovies } from "../services/movies.jsx";

/* COMPONENTE PARA SUGERENCIA DE PELÍCULAS */

export function useMovies(search) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMovieList, setErrorMovieList] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return;

    try {
      setLoading(true);
      setErrorMovieList(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
      setLoading(false);
    } catch (e) {
      setErrorMovieList(e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, getMovies, loading, errorMovieList };
}
