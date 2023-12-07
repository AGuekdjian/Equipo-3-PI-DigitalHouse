import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCalendar from "../../hooks/useCalendar";
import DateContext from "../../context/DatePickerContext";

const DatePickerComponent = ({ movieId, onDataChange, onDateIdChange, onCinemaChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { dates, getDateById } = useCalendar();
  const [availableDates, setAvailableDates] = useState([]);
  const [idDateSelected, setIdDateSelected] = useState({});


  useEffect(() => {
    getDateById(movieId);
  }, []);


  const handleDateChange = (date) => {
    onDataChange(date);
    setSelectedDate(date);
  }

  // console.log(moment(selectedDate).format('YYYY-MM-DD'));
  // console.log(moment(dates[1]?.date).format('YYYY-MM-DD'));


  useEffect(() => {
    if (dates && dates.length > 0) {
      const dateSelected = dates?.find(date => new Date(date.date).getFullYear() + '-' + (new Date(date.date).getMonth() + 1) + '-' + new Date(date.date).getDate() === new Date(selectedDate).getFullYear() + '-' + (new Date(selectedDate).getMonth() + 1) + '-' + new Date(selectedDate).getDate());
      
      onDateIdChange(dateSelected?.id)
      console.log(dateSelected?.id);
      setIdDateSelected(dateSelected?.id);

    }

  }, [selectedDate, dates]);


  useEffect(() => {
    if (dates && dates.length > 0) {
      const cinemaSelected = dates?.find(date => new Date(date.date).getFullYear() + '-' + (new Date(date.date).getMonth() + 1) + '-' + new Date(date.date).getDate() === new Date(selectedDate).getFullYear() + '-' + (new Date(selectedDate).getMonth() + 1) + '-' + new Date(selectedDate).getDate());
      
      onCinemaChange(cinemaSelected?.cinema)

    }

  }, [selectedDate, dates]);

  
  useEffect(() => {
    if (dates && dates.length > 0) {
      const newAvailableDates = dates.map(date => new Date(date.date));
      setAvailableDates(newAvailableDates);
    }

    console.log(availableDates);
    console.log(dates);
  }, [dates]);



  return (
    <DateContext.Provider value={selectedDate} >
      <DatePicker
        className="py-2 px-4 rounded-pill w-72 bg-grey-light mr-2"
        placeholderText="Seleccione la fecha"
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        includeDates={availableDates}
      />
    </DateContext.Provider>
  );
};

export default DatePickerComponent;
