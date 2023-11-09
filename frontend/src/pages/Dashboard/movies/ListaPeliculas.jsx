import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { Modal } from "reactstrap";

const ListaPeliculas = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    title: selectedMovie.title,
    overview: selectedMovie.overview,
    genre: selectedMovie.genre,
    image_urls: selectedMovie.image_urls,
  });

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
        `${Global.endpoints.backend.backendJava}api/movies/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setSubmitStatus("success");
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

  async function fetchGenres() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.backendJava}api/genres`
      );
      const jsonData = await response.json();
      setGenres(jsonData.content);
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

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
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
                    <button onClick={() => handleEdit(item)}>Editar</button>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Película</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="movieInput">
              <label htmlFor="title">Nombre de la pelicula</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="movieInput">
              <label htmlFor="genre">Genero de la pelicula</label>
              <select
                type="select"
                name="genre"
                id="genre"
                value={formData.genre}
                onChange={handleInputChange}
              >
                {genres.genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="movieInput">
              <label htmlFor="overview">Sinopsis</label>
              <textarea
                name="overview"
                id="overview"
                cols="30"
                rows="10"
                value={formData.overview}
                onChange={handleInputChange}
                style={{ resize: "none" }}
              ></textarea>
            </div>

            <div className="movieInput">
              <label htmlFor="image_urls">URLs de imagenes</label>
              {formData.image_urls.map((imageUrl, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="image_urls"
                    value={imageUrl}
                    onChange={(event) => handleImageUrlChange(event, index)}
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

            <button type="submit">Registrar pelicula</button>
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListaPeliculas;
