import { useState, useCallback } from "react";
import { searchFavorites, addNewFavorite } from "../services/favorites.jsx";

export function useFavorites() {
	const [favorites, setFavorites] = useState([])
	const [errorFavorites, setErrorFavorites] = useState(null)
	const token = localStorage.getItem("token");
	const [addResponse, setAddResponse] = useState(null);

	const getAllFavorites = useCallback(async () => {

		try {
			setErrorFavorites(null);
			const newFavorites = await searchFavorites({ token });
			setFavorites(newFavorites);
		} catch (e) {
			setErrorFavorites(e.message);
			console.log(e.message);
		}
	}, []);

	const addFavorite = useCallback(async (id) => {

		try {
			setErrorFavorites(null);
			const addResponse = await addNewFavorite({ id, token });
			setAddResponse(addResponse);
		} catch (e) {
			setErrorFavorites(e.message);
			console.log(e.message);
		}
	}, []);






	return { favorites, getAllFavorites, errorFavorites, addResponse, addFavorite}
}
