import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import Card from "../../components/card/Card";
import FormBusquedaPelicula from "../../components/Forms/FormBusquedaPelicula";
import { Spinner } from "reactstrap";
import "./Home.css";
import { useQuery } from "react-query";
import { Global } from "../../helpers/Global";
import Pagination from "../../components/Pagination";

export function Home() {

  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  let totalMovies = 0;
  
  const fetchMovies = async (page) => {
    const response = await fetch(
      `${Global.endpoints.backend.backendJava}api/movies `
      );
      if (!response.ok) {
        throw new Error('Error al cargar datos desde la API');
      }
      return response.json();
    };  
    
    const {isLoading, isError, data} = useQuery(
      ['peliculas', 0],
      () => fetchMovies(0)
      )
      
      if(data) totalMovies = data.content.length;
 


  const [peliculasRandom, setPeliculasRandom] = useState([]);

  useEffect(() => {
    const mezclarPeliculas = () => {
      if(data) {
        
        const peliculasCopia = [...data.content];
  
        const peliculasAleatorias = [];
        while (peliculasCopia.length > 0) {
          const randomIndex = Math.floor(Math.random() * peliculasCopia.length);
          const pelicula = peliculasCopia[randomIndex];
          peliculasAleatorias.push(pelicula);
          peliculasCopia.splice(randomIndex, 1);
        }
  
        setPeliculasRandom(peliculasAleatorias.slice(0, 10));
      }
    };
    mezclarPeliculas();
  }, [isLoading]);

  // console.log(peliculasRandom);

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
          {peliculasRandom.map((item, index) => {
            return <Card key={index} item={item} />;
          })}
        </div>
      )}
      <Pagination 
      moviesPerPage ={moviesPerPage} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      totalMovies={totalMovies} />
    </section>
  );
}
