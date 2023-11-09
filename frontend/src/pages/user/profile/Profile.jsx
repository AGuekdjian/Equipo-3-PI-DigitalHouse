import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/user.png";
import { useParams } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import { GetProfile } from "../../../helpers/GetProfile";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    getDataUser();
  }, [params]);

  const getDataUser = async () => {
    await GetProfile(
      Global.endpoints.backend.backendNode,
      token,
      params.userId,
      setLoading,
      setUserProfile
    );
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
                  <h1>{`${userProfile.name} ${userProfile.surname}`}</h1>
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
