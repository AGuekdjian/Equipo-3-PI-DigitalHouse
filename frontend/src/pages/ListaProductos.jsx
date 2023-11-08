import React, { useState, useEffect } from "react";
import { Global } from "../helpers/Global";

const ListaProductos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [currentPage]);

  async function fetchData() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.backendJava}api/movies?page=${currentPage} `
      );
      const jsonData = await response.json();
      setData((prevData) => prevData.concat(jsonData.content));
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar este elemento?"
    );
    if (confirmDelete) {
      try {
        await fetch(`${Global.endpoints.backend.backendJava}api/movies/${id}`, {
          method: "DELETE",
        });
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error al eliminar elemento de la API:", error);
      }
    }
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <button>Editar</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}

          {loading && (
            <tr>
              <td colSpan="3">Cargando...</td>
            </tr>
          )}
        </tbody>
      </table>

      {!loading && (
        <button
          className="py-2 px-4 bg-sky rounded-xl"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {" "}
          Cargar más resultados{" "}
        </button>
      )}
    </div>
  );
};

export default ListaProductos;
