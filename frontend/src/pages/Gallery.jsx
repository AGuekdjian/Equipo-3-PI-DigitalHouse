import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
<<<<<<< HEAD


export function Gallery() {


=======
import peliculas from "../mockJsonPelis.json";
import { Link } from "react-router-dom";

export function Gallery() {
>>>>>>> d1fb1b1496aa8a2b39fa7975913c2d4159e713d2
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
=======
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

>>>>>>> d1fb1b1496aa8a2b39fa7975913c2d4159e713d2
  useEffect(() => {
    fetchData()
  }, []);

<<<<<<< HEAD

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:8080/api/movie/${id}`);
      const jsonData = await response.json();
      setItem(jsonData);
      setLoading(false)
    } catch (error) {
      console.error('Error al cargar datos desde la API:', error);

    }
  }

  console.log(item);


=======
>>>>>>> d1fb1b1496aa8a2b39fa7975913c2d4159e713d2
  return (
    <div>
      <h1>Imagenes del producto</h1>

      <h2>{item.title}</h2>

      {loading ? <h2>Cargando...</h2> :

        <div>

          <div className="lefContainer" >
            <img src={item.image_urls[0]} alt="" />
          </div>

          <div className="rightContainer" >
            {item.image_urls.map((image, index) => {
              return (
                <img src={image} alt="" key={index} />
              )
            })}
          </div>

        </div>


      }

    
    </div>
  );
}
