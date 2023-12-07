import { Global } from "../helpers/Global";



export const searchFavorites = async ({ token }) => {

	try {
    const response = await fetch(`${Global.endpoints.backend.Prod}/api/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const favoritesList = await response.json();
    return favoritesList;
	} catch (e) {
		throw new Error(e.message)
	}

}

export const addNewFavorite = async ({ id, token }) => {
  try {
    const response = await fetch(`${Global.endpoints.backend.Prod}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'movieId': id
      })
    });
    const data = await response.json();
    return data;
  } catch (e) {
		console.log(e.message);
    throw new Error(e.message);
  }
}