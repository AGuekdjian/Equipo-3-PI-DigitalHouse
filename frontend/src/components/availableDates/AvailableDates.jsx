import React from "react";
import DatePickerComponent from "../datePickerComponent/DatePickerComponent";

export const AvailableDates = ({movieId, onDateChange, onDateIdChange, onCinemaChange}) => {
  console.log(movieId, onDateChange, onDateIdChange, onCinemaChange);
  return (
    <section>
      <h2 className="font-extrabold text-2xl text-grey-light">
        Fechas Disponibles
      </h2>
      <div>
        <DatePickerComponent onCinemaChange={onCinemaChange} onDateIdChange={onDateIdChange} onDataChange={onDateChange} movieId={movieId} />
      </div>
    </section>
  );
};
