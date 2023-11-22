import { Global } from "../helpers/Global";

export const searchMovies = async ({ search }) => {


    // if (search === '') return null
  try {
    const response = await fetch(`${Global.endpoints.backend.Prod}/api/movies/findByTitle?title=${search}`)
    const movieList = await response.json()
    console.log("hola");
    return movieList
    
  } catch (e) {
    throw new Error(e.message)
  }

}

