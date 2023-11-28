import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetMovieById, Global, BackTo } from "../helpers";
import { Spinner } from "reactstrap";

export function Gallery() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const righContainerImages = [];
  if (item.image_urls) {
    for (let i = 1; i < item.image_urls.length; i++) {
      righContainerImages.push(item.image_urls[i]);
    }
  }

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
        <section className=" px-5 md:px-10 lg:px-20 h-full mt-20 flex flex-col items-center">
          <section>
            <div className="flex justify-between w-full mb-4">
              <h1 className="font-extrabold text-1xl md:text-2xl lg:text-3xl text-grey-light ml-4">
                {item.title}
              </h1>
              <div className="mr-16">
                <button onClick={BackTo}>
                  <i className="fa-solid fa-arrow-left text-2xl text-grey-light hover:text-sky transition-all"></i>
                </button>
              </div>
            </div>
            <div className="mainContainer flex flex-col md:flex-row">
              <article className="leftContainer w-full md:w-1/2 mb-2 md:mb-0 md:mr-4">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={item.image_urls[0]}
                  alt={item.title}
                />
              </article>

              <section className="rightContainer w-full md:w-1/2 flex flex-wrap">
                {righContainerImages.map((image, index) => {
                  return (
                    <article
                      key={index}
                      className="w-full md:w-1/2 h-1/2 flex p-2 pb-3"
                    >
                      <img
                        className="w-full h-full object-cover rounded-xl "
                        src={image}
                        alt=""
                      />
                    </article>
                  );
                })}
              </section>
            </div>
          </section>
          <section className="mt-6">Slide</section>
        </section>
      )}
    </section>
  );
}
