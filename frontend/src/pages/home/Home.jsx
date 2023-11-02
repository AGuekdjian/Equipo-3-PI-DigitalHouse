import React, { useState, useEffect } from "react";
// import { useGlobalContext } from "../../hooks/useGlobalContext";
// import Card from "../../components/movie/Movie";
import { Spinner } from "reactstrap";
import "./Home.css";
// import { useQuery } from "react-query";
import { Global } from "../../helpers/Global";
// import PaginationComponent from "../../components/PaginationComponent";
// import Pagination from "react-bootstrap/Pagination";
// import { useNavigate } from "react-router-dom";
// import MovieList from "../../components/movieList/MovieList";
import { GetMovies } from "../../helpers/GetMovies";
import Pagination from "../../components/pagination/Pagination";
import Search from "../../components/Forms/Search";

export function Home() {
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const [peliculasRandom, setPeliculasRandom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = peliculasRandom.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    GetMovies(
      Global.endpoints.backend.backendJava,
      setLoading,
      setPeliculasRandom
    );
  }, []);

  // const [pageNumber, setPageNumber] = useState(0)
  // const [itemPagination, setItemPagination] = useState([])

  // const fetchMovies = async (page, url) => {
  //   setPageNumber(page);
  //   navigate(`/page/${page}`);

  //   let uri = page === null ? url : `${Global.endpoints.backend.backendJava}api/movies?page=${page}`

  //   const response = await fetch(uri)
  //   if (!response.ok) {
  //     throw new Error('Error al cargar datos desde la API');
  //   }
  //   const data = await response.json();

  //   //// Mezcla las películas y establece el estado de peliculasRandom aquí
  //   // const peliculasCopia = [...data.content];
  //   // const peliculasAleatorias = [];
  //   // while (peliculasCopia.length > 0) {
  //   //   const randomIndex = Math.floor(Math.random() * peliculasCopia.length);
  //   //   const pelicula = peliculasCopia[randomIndex];
  //   //   peliculasAleatorias.push(pelicula);
  //   //   peliculasCopia.splice(randomIndex, 1);
  //   // }
  //   // setPeliculasRandom(peliculasAleatorias.slice(0, 10));

  //   let items = []
  //   if (data) {
  //     for (let i = 1; i < data.totalPages; i++) {

  //       items.push(<Pagination.Item key={i} onClick={(e) => {
  //         const newPageNumber = parseInt(e.target.text - 1);
  //         fetchMovies(newPageNumber, null);
  //       }}>{i}</Pagination.Item>)

  //     }
  //     setItemPagination(items)

  //   }

  //   return data;
  // };

  // const { isLoading, isError, data } = useQuery(
  //   ['peliculas', pageNumber],
  //   () => fetchMovies(pageNumber)
  // )

  // useEffect(() => {
  //   let items = []
  //   if (data) {
  //     for (let i = 1; i < data.totalPages; i++) {
  //       items.push(<Pagination.Item key={i} onClick={(e) => {
  //         const newPageNumber = parseInt(e.target.text - 1);
  //         fetchMovies(newPageNumber, null);

  //       }}>{i}</Pagination.Item>)
  //     }
  //     setItemPagination(items)
  //   }
  // }, [pageNumber, data])

  return (
    <section className="w-full flex items-center justify-center flex-col">
      {/* <Categorias /> */}

      {loading ? (
        <Spinner color="primary" className="mt-8">
          Loading...
        </Spinner>
      ) : (
        <>
          <Search movies={currentPosts} />
          <Pagination
            totalPosts={peliculasRandom.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
      {/* <PaginationComponent items={itemPagination} fetch={fetchMovies} pageNumer={pageNumber} /> */}
    </section>
  );
}
