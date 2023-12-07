import { searchDatesById } from "../services/calendar";
import { useState, useCallback } from "react";

const useCalendar = () => {
	const [dates, setDates] = useState([]);

	const getDateById = useCallback(async (id) => {
		
		try {
			const newDates = await searchDatesById(id);
			setDates(newDates);
		} catch (e) {
			console.log(e.message);
		}
	} , []);


	return { dates, getDateById }

	
}

export default useCalendar