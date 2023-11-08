import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import Card from "../../components/card/Card";
import FormBusquedaPelicula from "../../components/Forms/FormBusquedaPelicula";
import { Spinner } from "reactstrap";
import "./Home.css";

export function Home() {
  const { data, loading } = useGlobalContext();
  const [peliculasRandom, setPeliculasRandom] = useState([]);

  useEffect(() => {
    const mezclarPeliculas = () => {
      const peliculasCopia = [...data];

      const peliculasAleatorias = [];
      while (peliculasCopia.length > 0) {
        const randomIndex = Math.floor(Math.random() * peliculasCopia.length);
        const pelicula = peliculasCopia[randomIndex];
        peliculasAleatorias.push(pelicula);
        peliculasCopia.splice(randomIndex, 1);
      }

      setPeliculasRandom(peliculasAleatorias.slice(0, 10));
    };
    mezclarPeliculas();
  }, [loading]);

  // console.log(peliculasRandom);

  return (
    <section className="w-full flex items-center justify-center flex-col">
      <FormBusquedaPelicula />
      {/* <Categorias /> */}

      {loading ? (
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
    </section>
  );
}
