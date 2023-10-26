import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import peliculas from "../mockJsonPelis.json"
import { Link } from "react-router-dom";

export function Detail() {
  const { id } = useParams();
  // const { data } = useGlobalContext();
  const [item, setItem] = useState({});
  const data = peliculas;
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//     fetchData()
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await fetch(`http://localhost:8080/api/movie/${id}`);
//       const jsonData = await response.json();
//       setItem(jsonData);
//       setLoading(false)
//     } catch (error) {
//       console.error('Error al cargar datos desde la API:', error);

//     }
//   }


  useEffect(() => {
    const movieParams = data.find((movie) => movie.id == id);
    setItem(movieParams);
  }, []);

  console.log(item);
  // console.log(item.genres);

  return (
    <div>
      <h1>Detalle de producto</h1>

      {/* <img src={item.image_urls[0]} alt="" />
      <h2>{item.title}</h2>
      <h3>{item.genre}</h3>
      <h3>{item.overview}</h3>  */}
      <Link to={`/detail/images/${item.id}`}> <button> Más imagenes </button> </Link>
     

      <h2>{item.name}</h2>
      <h3>{item.description}</h3>
      {/* <img src={item.images[0].url_image} alt="" />  */}
    </div>
  );
}
