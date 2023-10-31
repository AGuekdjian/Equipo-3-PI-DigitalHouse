import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../helpers/Global";
import { useAuth } from "../hooks/useAuth";

export function Detail() {
  const { auth } = useAuth();
  const { _id } = auth;
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

  return (
    <div>
      <h1>Detalle de producto</h1>

      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <div>
          <h2>{item.title}</h2>
          <h3>{item.genre}</h3>
          <h3>{item.overview} </h3>
          <img src={item.image_urls[0]} alt="" />
        </div>
      )}

      {_id ? (
        <Link
          to={`/admin/detail/images/${item.id}`}
          className="btn py-1 px-2 bg-sky text-dark rounded-pill font-extrabold text-sm"
        >
          Más imagenes
        </Link>
      ) : (
        <Link
          to={`/detail/${item.id}`}
          className="btn py-1 px-2 bg-sky text-dark rounded-pill font-extrabold text-sm"
        >
          Más imagenes
        </Link>
      )}
    </div>
  );
}
