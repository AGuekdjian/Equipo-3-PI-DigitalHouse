import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../helpers/Global";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "reactstrap";

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

  const backTo = () => window.history.back();

  return (
    <section className="p-4 h-screen flex flex-col items-center">
      {loading ? (
        <Spinner color="primary" className="mt-8">
          Loading...
        </Spinner>
      ) : (
        <>
          <div className="flex justify-between mt-12 w-full">
            <h1 className="font-extrabold text-2xl text-grey-light ml-4">
              {item.title}
            </h1>
            <div className="mr-24">
              <button onClick={backTo}>
                <i className="fa-solid fa-arrow-left text-2xl text-grey-light"></i>
              </button>
            </div>
          </div>
          <article className="flex mt-6">
            <div className="p-2">
              <img
                src={item.image_urls[0]}
                alt={item.title}
                className="w-[180rem] rounded-xl"
              />
            </div>
            <div className="p-2">
              <div className="mb-6 mt-4">
                <i className="fa-solid fa-share-nodes text-lg mx-1"></i>
                <i className="fa-regular fa-heart text-lg mx-1.5"></i>
              </div>
              <div className="mb-6">
                <h3 className="my-1">2016 | Clasificacion por edad: 13+</h3>
                <h3>1 h 53 min | {item.genre}</h3>
              </div>
              <h3 className="mb-3">{item.overview} </h3>
              <div className="flex justify-end">
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
            </div>
          </article>
        </>
      )}
    </section>
  );
}
