import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  async function fetchData() {
    try {
      const res = await fetch(`${Global.endpoints.backend.Prod}/auth/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await res.json();

      if (res.status == 200) {
        setData(jsonData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handlePromote = async (email) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea promover este usuario a admin?"
    );
    if (confirmDelete) {
      try {
        await fetch(
          `${Global.endpoints.backend.Prod}/auth/promoteToAdmin/${email}`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error) {
        throw new Error("Error al promover a admin:", error);
      }
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
              data.map((item) => {
                return (
                  <tr
                    key={item.id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      {item.id}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.last_name}</td>
                    <td className="px-6 py-4">{item.roles}</td>
                    <td>
                      <button onClick={() => handlePromote(item.email)}>
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
