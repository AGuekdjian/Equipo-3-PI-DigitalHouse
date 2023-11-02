// import React, { useState } from "react";
// import { MagicMotion } from "react-magic-motion";
// import "./FormBusquedaPelicula.css";
// import MovieList from "../movieList/MovieList";
// import Movie from "../movie/Movie";

// const FormBusquedaPelicula = ({ movies }) => {
//   const [searchText, setSearchText] = useState("");
//   return (
//     <section className="flex text-center flex-col w-3/12 mt-8 search-styles-mobile">
//       <h1 className="font-extrabold text-2xl">Buscar Pelicula</h1>

//       <div className="mt-2 search-input-container">
//         {/* <input type="text" placeholder='Seleccione su ubicación' /> */}
//         <input
//           id="searchInput"
//           placeholder="Avatar"
//           className="py-2 px-4 rounded-pill w-72 bg-grey-light"
//           type="text"
//           maxLength={70}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />

//         <MagicMotion>
//           {console.log(movies)}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "0.65em",
//             }}
//           >
//             {movies
//               .filter(({ title }) => {
//                 title
//                   .toLowerCase()
//                   .trim()
//                   .includes(searchText.toLowerCase().trim());
//               })
//               .map(({ image_urls, id, title }) => {
//                 console.log(title);
//                 return (
//                   <Movie
//                     key={id}
//                     id={id}
//                     title={title}
//                     image_urls={image_urls}
//                   />
//                 );
//               })}
//           </div>
//         </MagicMotion>
//       </div>
//     </section>
//   );
// };

// export default FormBusquedaPelicula;

import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

function Movie({ title, image_urls }) {
  return (
    <div
      style={{
        width: "10rem",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "rgba(238, 238, 238)",
      }}
    >
      <h5
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.1em",
        }}
      >
        {title}
      </h5>
      <img
        alt={`image of ${title}`}
        src={image_urls[0]}
        style={{ width: "auto", height: "8rem", margin: "auto" }}
      />
    </div>
  );
}

export default function Search({ movies }) {
  const [searchText, setSearchText] = useState("");

  return (
    <section className="flex flex-col items-center mt-2 search-input-container">
      <label htmlFor="searchInput" className="font-extrabold text-2xl">
        Buscar Pelicula
      </label>
      <input
        id="searchInput"
        placeholder="Harry Potter"
        type="text"
        maxLength={70}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="py-2 px-4 rounded-pill w-72 bg-grey-light"
      />
      <MagicMotion>
        <section className="h-[33rem] p-4 mt-8 w-full grid grid-cols-5 gap-4 justify-items-center styles-mobile">
          {movies
            .filter(({ title }) =>
              title
                .toLowerCase()
                .trim()
                .includes(searchText.toLowerCase().trim())
            )
            .map(({ id, title, image_urls }) => (
              <Movie key={id} title={title} image_urls={image_urls} />
            ))}
        </section>
      </MagicMotion>
    </section>
  );
}
