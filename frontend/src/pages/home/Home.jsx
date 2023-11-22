import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../../components/card/Card";
import FormBusquedaPelicula from "../../components/Forms/FormBusquedaPelicula";
import { Spinner } from "reactstrap";
import "./Home.css";
import { useQuery } from "react-query";
import { Global } from "../../helpers/Global";
import PaginationComponent from "../../components/PaginationComponent";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useMovies } from "../../hooks/useMovies";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

export function Home() {
  const [route, setRoute] = useState("");
  const { auth } = useAuth();
  const { role } = auth;
  const navigate = useNavigate();
  const [peliculasRandom, setPeliculasRandom] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemPagination, setItemPagination] = useState([]);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies, errorMovieList } = useMovies({ search });

  function getPageRange(currentPage, totalPages) {
    let startPage = Math.max(currentPage - 2, 2);
    let endPage = Math.min(startPage + 4, totalPages - 1);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 2);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  const fetchMovies = async (page, url) => {
    setPageNumber(page);
    navigate(`${route}/page/${page + 1}`);

    let uri =
      page === null
        ? url
        : `${Global.endpoints.backend.Prod}/api/movies?page=${page}`;

    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Error al cargar datos desde la API");
    }
    const data = await response.json();

    return data;
  };

  const { isLoading, isError, data } = useQuery(["peliculas", pageNumber], () =>
    fetchMovies(pageNumber)
  );

  useEffect(() => {
    if (role === "ROLE_ROOT" || role === "ROLE_ADMIN") {
      setRoute("/admin");
    } else if (role === "ROLE_USER") {
      setRoute("/user");
    } else {
      setRoute("/");
    }
  }, []);

  useEffect(() => {
    if (role === "ROLE_ROOT" || role === "ROLE_ADMIN") {
      setRoute("/admin");
    } else if (role === "ROLE_USER") {
      setRoute("/user");
    } else {
      setRoute("/");
    }

    let items = [];

    if (data) {
      const pageRange = getPageRange(pageNumber + 1, data.totalPages);

      items.push(
        <Pagination.Item
          key={1}
          onClick={() => {
            fetchMovies(0, null);
          }}
        >
          {1}
        </Pagination.Item>
      );

      if (pageRange[0] > 2) {
        items.push(<Pagination.Ellipsis />);
      }

      for (let i = 0; i < pageRange.length; i++) {
        items.push(
          <Pagination.Item
            key={pageRange[i]}
            onClick={() => {
              fetchMovies(pageRange[i] - 1, null);
            }}
          >
            {pageRange[i]}
          </Pagination.Item>
        );
      }

      if (pageRange[pageRange.length - 1] < data.totalPages - 1) {
        items.push(<Pagination.Ellipsis />);
      }

      items.push(
        <Pagination.Item
          key={data.totalPages}
          onClick={() => {
            fetchMovies(data.totalPages - 1, null);
          }}
        >
          {data.totalPages}
        </Pagination.Item>
      );

      const peliculasCopia = [...data.content];
      const peliculasAleatorias = [];
      while (peliculasCopia.length > 0) {
        const randomIndex = Math.floor(Math.random() * peliculasCopia.length);
        const pelicula = peliculasCopia[randomIndex];
        peliculasAleatorias.push(pelicula);
        peliculasCopia.splice(randomIndex, 1);
      }
      setPeliculasRandom(peliculasAleatorias.slice(0, 10));

      setItemPagination(items);
    }
  }, [pageNumber, data, role]);

  /*LOGICA PARA SUGERENCIA DE PELICULAS*/

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    setPeliculasRandom(movies.content);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <section className="w-full flex items-center justify-center flex-col">
      <FormBusquedaPelicula
        onSubmit={handleSubmit}
        onChange={handleChange}
        movies={movies}
        search={search}
        error={errorMovieList}
      />
      {/* <Categorias /> */}

      {isLoading ? (
        <Spinner color="primary" className="mt-8">
          Loading...
        </Spinner>
      ) : (
        <div className="p-4 mt-8 w-full grid grid-cols-5 gap-4 justify-items-center styles-mobile">
          {peliculasRandom.length > 0
            ? peliculasRandom.map((item, index) => {
                return <Card key={index} item={item} />;
              })
            : null}
        </div>
      )}
      <PaginationComponent
        items={itemPagination}
        fetch={fetchMovies}
        pageNumer={pageNumber}
      />
    </section>
  );
}
