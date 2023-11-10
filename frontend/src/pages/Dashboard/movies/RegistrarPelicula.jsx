import { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";

export function RegistrarPelicula() {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    genre: "",
    image_urls: [],
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.backendJava}/api/genre`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${Global.endpoints.backend.backendJava}api/movies/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      if (response.status === 409) {
        setSubmitStatus("conflict");
      } else {
        setSubmitStatus("success");
      }
    } catch (error) {
      console.error("Error al enviar datos a la API:", error);
      setSubmitStatus("error");
    }
  };

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

  return (
    <div>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Nombre de la pelicula</label>
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
            <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Genero de la pelicula</label>
            <select
              type="select"
              name="genre"
              id="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              {data
                ? data.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))
                : null}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="overview" className="block text-gray-700 text-sm font-bold mb-2">Sinopsis</label>
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
            <label htmlFor="image_urls" className="block text-gray-700 text-sm font-bold mb-2">URLs de imagenes</label>
            {formData.image_urls.map((imageUrl, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="image_urls"
                  value={imageUrl}
                  onChange={(event) => handleImageUrlChange(event, index)}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button type="button" onClick={() => handleRemoveImageUrl(index)}>
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
          {submitStatus === "conflict" && (
            <p>
              Ya existe una pelicula con ese título, intenta nuevamente
              registrando otra película
            </p>
          )}
          {submitStatus === "error" && (
            <p>
              Ocurrió un error al enviar los datos. Por favor, inténtelo de nuevo
              más tarde.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
