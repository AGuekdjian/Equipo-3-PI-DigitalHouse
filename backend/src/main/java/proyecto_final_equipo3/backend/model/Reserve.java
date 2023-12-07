package proyecto_final_equipo3.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "movie_calendar_id"}))
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_reserve;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "movie_calendar_id")
    private MovieCalendar movie_calendar;

    @NotNull
    private Integer seats;
}