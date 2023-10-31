import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Global } from "../helpers/Global";

export function Gallery() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.backendJava}api/movies/${id}`
      );
      const jsonData = await response.json();
      setItem(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  console.log(item);

  return (
    <div>
      <h1>Imagenes del producto</h1>

      <h2>{item.title}</h2>

      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <div>
          <div className="lefContainer">
            <img src={item.image_urls[0]} alt="" />
          </div>

          <div className="rightContainer">
            {item.image_urls.map((image, index) => {
              return <img src={image} alt="" key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
