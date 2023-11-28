export const GetMovieById = async (url, setLoading, setItem) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    setItem(jsonData);
    setLoading(false);
  } catch (error) {
    console.error("Error al cargar datos desde la API:", error);
  }
};
