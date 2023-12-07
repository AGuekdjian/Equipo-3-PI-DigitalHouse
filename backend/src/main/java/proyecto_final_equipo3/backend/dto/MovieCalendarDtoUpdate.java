package proyecto_final_equipo3.backend.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import proyecto_final_equipo3.backend.model.Cinema;
import java.time.LocalDate;
import java.time.LocalTime;
@Getter
@Setter
public class MovieCalendarDtoUpdate {
    @NotNull
    Integer id;
    @NotNull
    Cinema cinema;
    @NotNull
    LocalDate date;
    @NotNull
    LocalTime time;
    @Min(value = 1, message = "total_seats must be greater than 0")
    Integer total_seats;
    @Min(value = 1, message = "available_seats must be greater than 0")
    Integer available_seats;
    @NotNull
    Integer movieId;
}
