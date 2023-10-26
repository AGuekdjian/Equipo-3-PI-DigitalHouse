import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="w-64 pt-4 px-4 pb-2.5 bg-sky-light text-dark rounded-xl flex flex-col items-center text-center">
      <img className="w-64 h-72" src={item.image_urls[0]} alt="" />
      <h2 className="my-2">{item.name}</h2>
      <Link to={`/detail/${item.id}`}>
        {" "}
        <button className="btn py-1 px-2 bg-sky text-dark rounded-pill font-extrabold text-sm">
          {" "}
          Más detalle{" "}
        </button>{" "}
      </Link>
    </div>
  );
};

export default Card;