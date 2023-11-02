import React from "react";

const mezclarPelis = (movies, setPeliculasRandom) => {
  const randomMovies = JSON.parse(localStorage.getItem("mixMovies"));

  if (randomMovies) {
    setPeliculasRandom(randomMovies);
  } else {
    const newRandomMovies = [...movies].sort(() => Math.random() - 0.5);
    setPeliculasRandom(newRandomMovies);
    localStorage.setItem("mixMovies", JSON.stringify(newRandomMovies));
  }
};

export const GetMovies = async (url, setLoading, setPeliculasRandom) => {
  try {
    const res = await fetch(`${url}api/movies`);

    if (!res.ok) throw new Error("Error al traer las peliculas.");

    const data = await res.json();

    mezclarPelis(data.content, setPeliculasRandom);
    setLoading(false);
  } catch (error) {
    throw new Error("Error al consultar la API.");
  }
};
