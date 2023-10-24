import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import Card from '../Components/Card'
import FormBusquedaPelicula from '../Components/Forms/FormBusquedaPelicula'
import Categorias from '../Components/Categorias'

const Home = () => {

  const { data, loading } = useGlobalContext()
  const [peliculasRandom, setPeliculasRandom] = useState([])



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

      setPeliculasRandom(peliculasAleatorias)  

    };  

    mezclarPeliculas()
  }, [window.location.href])
  

  // console.log(peliculasRandom);



  return (
    <main className="" >
      <FormBusquedaPelicula />
      <Categorias />

      <div className='card-grid'>


        {loading ? <h1>Loading...</h1> : peliculasRandom.map((item, index) => {
          console.log(item);
          return (
            <Card key={index} item={item} />

          )
        }
        )}

      </div>
    </main>
  )
}

export default Home