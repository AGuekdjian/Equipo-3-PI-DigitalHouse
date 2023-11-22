import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { FechData } from "../../../helpers/FetchData";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    FechData(
      `${Global.endpoints.backend.Prod}/auth/users`,
      token,
      "GET",
      setData,
      setLoading
    );
  }, []);

  const handlePromote = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea promover este usuario a admin?"
    );
    if (confirmDelete) {
      FechData(
        `${Global.endpoints.backend.Prod}/auth/promoteToAdmin/${id}`,
        token,
        "POST",
        null,
        setLoading
      );
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-sky-light dark:bg-sky-light dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 dark:text-black ">
                ID
              </th>
              <th scope="col" className="px-6 py-3 dark:text-black ">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 dark:text-black ">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3 dark:text-black ">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {data && !loading ? (
              data.length > 0 &&
              data.map(({ id, name, last_name, roles }) => {
                return (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      {id}
                    </th>
                    <td className="px-6 py-4">{name}</td>
                    <td className="px-6 py-4">{last_name}</td>
                    <td className="px-6 py-4">{roles}</td>
                    <td>
                      <button onClick={() => handlePromote(id)}>
                        Promover admin
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>Cargando...</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
