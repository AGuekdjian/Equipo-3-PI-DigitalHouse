import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import FormBusquedaPelicula from "../../components/Forms/FormBusquedaPelicula";
import { Spinner } from "reactstrap";
import "./Home.css";
import { useQuery } from "react-query";
import { Global } from "../../helpers/Global";
import PaginationComponent from "../../components/PaginationComponent";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [peliculasRandom, setPeliculasRandom] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemPagination, setItemPagination] = useState([]);

  const fetchMovies = async (page, url) => {
    setPageNumber(page);
    navigate(`/admin/page/${page}`);

    let uri =
      page === null
        ? url
        : `${Global.endpoints.backend.backendJava}/api/movies?page=${page}`;

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
    let items = [];
    if (data) {
      for (let i = 1; i < data.totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            onClick={(e) => {
              const newPageNumber = parseInt(e.target.text - 1);
              fetchMovies(newPageNumber, null);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }

          
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
  }, [pageNumber, data]);

  return (
    <section className="w-full flex items-center justify-center flex-col">
      <FormBusquedaPelicula />
      {/* <Categorias /> */}

      {isLoading ? (
        <Spinner color="primary" className="mt-8">
          Loading...
        </Spinner>
      ) : (
        <div className="p-4 mt-8 w-full grid grid-cols-5 gap-4 justify-items-center styles-mobile">
          {peliculasRandom.length  > 0 ? peliculasRandom.map((item, index) => {
            return <Card key={index} item={item} />;
          }) : null}
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
