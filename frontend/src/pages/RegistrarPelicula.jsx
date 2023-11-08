import { useState } from "react";

export function RegistrarPelicula() {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    genre: "",
    image_urls: [],
  });
  const [submitStatus, setSubmitStatus] = useState(null);

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
      <h1>Registrar nueva pelicula</h1>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
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
              <button type="button" onClick={() => handleRemoveImageUrl(index)}>
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
  );
}
