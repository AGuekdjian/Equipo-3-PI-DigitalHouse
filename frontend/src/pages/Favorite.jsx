import React, { useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import Card from "../components/card/Card";

export const Favorite = () => {
  const { favorites, getAllFavorites} = useFavorites();

  useEffect(() => {
    getAllFavorites();
  }, []);

  return <div className="w-full h-full">
    <h1 className="text-2xl text-center font-bold mt-8">Mis favoritos</h1>

    <section className="p-4 mt-8 w-full grid grid-cols-5 gap-4 justify-items-center styles-mobile">
      {favorites && favorites.length > 0
        ? favorites.map((item, index) => {
          return <Card key={index} item={item} />;
        })
        : null}
    </section>

  </div>;
};

export default Favorite;