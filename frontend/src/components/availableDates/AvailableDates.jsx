import React from "react";
import DatePickerComponent from "../datePickerComponent/DatePickerComponent";

export const AvailableDates = () => {
  return (
    <section>
      <h2 className="font-extrabold text-2xl text-grey-light">
        Fechas Disponibles
      </h2>
      <div>
        <DatePickerComponent />
      </div>
    </section>
  );
};
