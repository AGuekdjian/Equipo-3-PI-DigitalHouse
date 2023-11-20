import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Global } from "../helpers/Global";
import { Spinner } from "reactstrap";

export function Gallery() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const righContainerImages = [];
  if (item.image_urls) {
    for (let i = 1; i < item.image_urls.length; i++) {
      righContainerImages.push(item.image_urls[i]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.Prod}/api/movies/${id}`
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
    <div>
      {loading ? (
        <Spinner color="primary" className="mt-8">
          Loading...
        </Spinner>
      ) : (
        <div className="mx-auto px-5 md:px-10 lg:px-20">
          <div>
            <div className="flex justify-between mt-12 w-full mb-4">
              <h1 className="font-extrabold text-1xl md:text-2xl lg:text-3xl text-grey-light ml-4">
                {item.title}
              </h1>
              <div className="mr-24">
                <button onClick={backTo}>
                  <i className="fa-solid fa-arrow-left text-2xl text-grey-light"></i>
                </button>
              </div>
            </div>
            <div className="mainContainer flex flex-col md:flex-row">
              <div className="leftContainer w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={item.image_urls[0]}
                  alt=""
                />
              </div>

              <div className="rightContainer w-full md:w-1/2 flex flex-wrap">
                {righContainerImages.map((image, index) => {
                  return (
                    <div className="w-full md:w-1/2 h-1/2 flex p-2">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={image}
                        alt=""
                        key={index}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
