import { Global } from "../helpers/Global";


	export const searchDatesById = async(id) => {

		try {
			const response = await fetch(`${Global.endpoints.backend.Prod}/api/calendar/findByMovie/${id}`);
			const jsonData = await response.json();
			return jsonData;
		} catch (error) {
			console.error("Error al cargar datos desde la API:", error);
			throw new Error(error.message);
		}

	}


