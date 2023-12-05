import { React, useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { Global, GetMovieById, BackTo } from "../helpers";
import { useAuth } from "../hooks/useAuth";

const NewReserve = () => {

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { auth } = useAuth();


  useEffect(() => {
    getDataUser(auth);
  }, []);

  const getDataUser = async (user) => {
    if (!user) {
      throw new Error("Ah ocurrido un error al obtener los datos del usuario.");
    }
    setUserProfile(user);
  };



  useEffect(() => {
    GetMovieById(
      `${Global.endpoints.backend.Prod}/api/movies/${id}`,
      setLoading,
      setItem
    );
  }, []);


  return (


    <div>

      {item ? (
        <>
          <div>
            {loading ? (
              <p>Cargando...</p>
            ) : (<div>
              <h1>{item.title}</h1>
              <h2>{item.overview}</h2>
              <img src={item.image_urls[0]} />
            </div>)}

          </div>
          <hr />
          <h3>{userProfile.name}</h3>
          <h3>{userProfile.last_name}</h3>
          <h3>{userProfile.email}</h3>
        </>
      ) : (null)}


      <form action="">

        <div className='inputLabel'>
          <label htmlFor="comentarios">Comentarios extra</label>
          <textarea name="comentarios" id="comentarios" cols="30" rows="10"></textarea>
        </div>

        <button className='btn py-1 px-2 bg-sky text-dark rounded-pill font-extrabold text-sm' type='submit' >Confirmar reserva</button>
      </form>

    </div>
  )
}

export default NewReserve