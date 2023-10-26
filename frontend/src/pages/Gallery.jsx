import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import peliculas from "../mockJsonPelis.json"
import { Link } from "react-router-dom";


export function Gallery(){


  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

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


  return (
    <div>
      <h1>Imagenes del producto</h1>

      {/* <div className="lefContainer" >
        <img src={item.images_urls[0]} alt="" />
      </div>

      <div className="rightContainer" >
        {item.images_urls.map((image) => {
          return (
            <img src={image} alt="" />
          )
        })}
      </div> */}
    </div>
  )
}

