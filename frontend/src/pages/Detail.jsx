import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Global, GetMovieById, BackTo } from "../helpers";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "reactstrap";
import Share from "../components/shareComponent/Share";
import { AvailableDates } from "../components/availableDates/AvailableDates";

export function Detail() {
  const { auth } = useAuth();
  const { email, role } = auth;
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetMovieById(
      `${Global.endpoints.backend.Prod}/api/movies/${id}`,
      setLoading,
      setItem
    );
  }, []);

  return (
    <section className="flex justify-center items-center w-full">
      {loading ? (
        <Spinner color="primary" className="mt-8">
          Loading...
        </Spinner>
      ) : (
        <section className=" px-5  h-full mt-20 flex flex-col items-center">
          <div className="flex justify-between w-full">
            <h1 className="font-extrabold text-3xl text-grey-light ml-4">
              {item.title}
            </h1>
            <div className="mr-24">
              <button onClick={BackTo}>
                <i className="fa-solid fa-arrow-left text-2xl text-grey-light hover:text-sky transition-all"></i>
              </button>
            </div>
          </div>
          <section className="flex mt-6">
            <article className="p-2">
              <img
                src={item.image_urls[0]}
                alt={item.title}
                className="min-w-[45rem] max-w-[45rem] rounded-xl"
              />
            </article>
            <section className="p-2 ml-5 rounded-xl w-[700px]">
              <div className="mb-2 mt-4 flex items-center">
                <Share />
                <i className="fa-solid fa-heart text-lg text-grey-light mx-1.5 hover:text-red-600 cursor-pointer transition-all"></i>
              </div>
              <div className="mb-6">
                <h3 className="my-1">2016 | Clasificacion por edad: 13+</h3>
                <h3>1 h 53 min | {item.genre}</h3>
              </div>
              <h3 className="mb-3 text-left w-[628px]">
                <span className="text-grey-light font-bold">Resumen:</span>{" "}
                <br />
                {item.overview}{" "}
              </h3>
              <div className="flex justify-between px-9 mt-4">
                <div>
                  <ul className="flex">
                    <li className="mx-1 text-xl cursor-pointer hover:text-yellow-500 transition-all">
                      <i class="fa-solid fa-star"></i>
                    </li>
                    <li className="mx-1 text-xl cursor-pointer hover:text-yellow-500 transition-all">
                      <i class="fa-solid fa-star"></i>
                    </li>
                    <li className="mx-1 text-xl cursor-pointer hover:text-yellow-500 transition-all">
                      <i class="fa-solid fa-star"></i>
                    </li>
                    <li className="mx-1 text-xl cursor-pointer hover:text-yellow-500 transition-all">
                      <i class="fa-solid fa-star"></i>
                    </li>
                    <li className="mx-1 text-xl cursor-pointer hover:text-yellow-500 transition-all">
                      <i class="fa-solid fa-star"></i>
                    </li>
                  </ul>
                </div>
                {email ? (
                  <Link
                    to={`${
                      role === "ROLE_ROOT" || role === "ROLE_ADMIN"
                        ? "/admin"
                        : "/user"
                    }/detail/images/${item.id}`}
                    className="btn py-1 px-2 bg-sky text-dark rounded-pill font-extrabold text-sm"
                  >
                    Más imagenes
                  </Link>
                ) : (
                  <Link
                    to={`/detail/images/${item.id}`}
                    className="btn py-1 px-2 bg-sky text-dark rounded-pill font-extrabold text-sm"
                  >
                    Más imagenes
                  </Link>
                )}
              </div>
            </section>
          </section>
          <section className="flex justify-around w-full mt-4">
            <article>
              <h2 className="text-xl text-grey-light font-extrabold">
                Caracteristicas
              </h2>
              <div>
                <ul>
                  <li>Caracteristica 1</li>
                  <li>Caracteristica 2</li>
                  <li>Caracteristica 3</li>
                </ul>
              </div>
            </article>
            <section>
              {role === "ROLE_ROOT" || role === "ROLE_ADMIN" ? (
                <AvailableDates />
              ) : null}
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
