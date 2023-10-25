import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/context";

const Detail = () => {
  const { id } = useParams();
  const { data } = useGlobalContext();
  const [item, setItem] = useState({});

  useEffect(() => {
    const movieParams = data.find((movie) => movie.id == id);
    setItem(movieParams);
  }, []);

  console.log(item);
  // console.log(item.genres);

  return (
    <div>
      <h1>Detalle de producto</h1>
      <h2>{item.name}</h2>
      <h3>{item.description}</h3>
      {/* <img src={item.images[0].url_image} alt="" /> */}
    </div>
  );
};

export default Detail;
