import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/user.png";
import { useAuth } from "../../../hooks/useAuth";

export default function Profile() {
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  };

  return (
    <>
      <header className="aside__profile-info">
        <div className="profile-info__general-info">
          {!loading ? (
            <>
              <div className="general-info__container-avatar">
                <img
                  src={avatar}
                  className="list-end__img"
                  alt="Imagen de perfil"
                />
              </div>
            </>
          ) : (
            <div>
              <h2>Cargando imagen...</h2>
            </div>
          )}

          <div className="general-info__container-names">
            {!loading ? (
              <>
                <div className="container-names__name">
                  <h1>{`${userProfile.name} ${userProfile.last_name}`}</h1>
                </div>
              </>
            ) : (
              <h1>Cargando...</h1>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
