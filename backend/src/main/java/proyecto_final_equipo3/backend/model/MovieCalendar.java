package proyecto_final_equipo3.backend.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "movies_calendar",uniqueConstraints = @UniqueConstraint(columnNames = {"cinema", "date", "time", "movie_id"}))
@EntityListeners(AuditingEntityListener.class)
public class MovieCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Cinema cinema;

    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate date;

    @NotNull
    @Column(columnDefinition = "TIME")
    private LocalTime time;

    @NotNull
    @Column(name = "available_seats")
    private Integer available_seats;

    @NotNull
    @Column(name = "total_seats")
    private Integer total_seats;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime created_date;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private LocalDateTime last_modified_date;
}
