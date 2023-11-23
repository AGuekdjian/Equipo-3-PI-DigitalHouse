import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Lista de fechas que quieres deshabilitar
  const disabledDates = [
    new Date("2023-11-27"), // Ejemplo de fecha a deshabilitar
    // Agrega más fechas según sea necesario
    new Date("2023-11-24"),
    new Date("2023-11-30"),
  ];

  return (
    <DatePicker
      className="py-2 px-4 rounded-pill w-72 bg-grey-light mr-2"
      placeholderText="Seleccione la fecha"
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate={new Date()} // Solo permite seleccionar fechas posteriores a la actual
      excludeDates={disabledDates} // Aplica la función de deshabilitar fechas anteriores a la actual y específicas
    />
  );
};

export default DatePickerComponent;
