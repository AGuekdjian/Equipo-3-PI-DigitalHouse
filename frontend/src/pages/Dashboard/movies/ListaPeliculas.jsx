import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { Modal } from "react-bootstrap";

export function ListaPeliculas() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    genre: "",
    image_urls: [],
  });
  const [token, setToken] = useState();

  const handleImageUrlChange = (event, index) => {
    const { value } = event.target;
    const imageUrls = [...formData.image_urls];
    imageUrls[index] = value;
    setFormData({ ...formData, image_urls: imageUrls });
  };

  const handleAddImageUrl = () => {
    setFormData({ ...formData, image_urls: [...formData.image_urls, ""] });
  };

  const handleRemoveImageUrl = (index) => {
    const imageUrls = [...formData.image_urls];
    imageUrls.splice(index, 1);
    setFormData({ ...formData, image_urls: imageUrls });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${Global.endpoints.backend.Prod}/api/movies`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        }
      );
 
      if (response.status === 204) {
        setSubmitStatus("success");
      
      }else {
        setSubmitStatus("error");
      }

    } catch (error) {
      console.error("Error al enviar datos a la API:", error);
      setSubmitStatus("error");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchGenres();
    const token = localStorage.getItem("token");
    setToken(token);
  }, [currentPage]);

  async function fetchData() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.Prod}/api/movies?page=${currentPage}`
      );
      const jsonData = await response.json();
      data ? setData((prevData) => prevData.concat(jsonData.content)) : null;
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  async function fetchGenres() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.Prod}/api/genre`
      );
      const jsonData = await response.json();
      setGenres(jsonData);
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
        await fetch(`${Global.endpoints.backend.Prod}/api/movies/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error al eliminar elemento de la API:", error);
      }
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      ...movie,
    });
    setShowModal(true);
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
              <th scope="col" className="px-6 py-3 dark:text-black">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 dark:text-black">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.length > 0 &&
                data.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-5 ml-5"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}

            {loading && (
              <tr>
                <td colSpan="3">Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!loading && (
        <button
          className="py-2 px-4 bg-sky rounded-xl"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {" "}
          Cargar más resultados{" "}
        </button>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Película</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full max-w-xs">
            <form
              onSubmit={handleUpdate}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nombre de la pelicula
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="genre"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Genero de la pelicula
                </label>
                <select
                  type="select"
                  name="genre"
                  id="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {genres
                    ? genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="overview"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Sinopsis
                </label>
                <textarea
                  name="overview"
                  id="overview"
                  cols="30"
                  rows="10"
                  value={formData.overview}
                  onChange={handleInputChange}
                  style={{ resize: "none" }}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="image_urls"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  URLs de imagenes
                </label>
                {Array.isArray(formData.image_urls) &&
                  formData.image_urls.map((imageUrl, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name="image_urls"
                        value={imageUrl}
                        onChange={(event) => handleImageUrlChange(event, index)}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImageUrl(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                <button type="button" onClick={handleAddImageUrl}>
                  Agregar URL de imagen
                </button>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button type="submit">Registrar pelicula</button>
                </div>
              </div>
              {submitStatus === "success" && (
                <p>Los datos se enviaron correctamente.</p>
              )}
              {submitStatus === "error" && (
                <p>
                  Ocurrió un error al enviar los datos. Por favor, inténtelo de
                  nuevo más tarde.
                </p>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
