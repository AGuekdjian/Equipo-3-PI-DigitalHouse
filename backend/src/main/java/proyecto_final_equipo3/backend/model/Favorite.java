package proyecto_final_equipo3.backend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "movie_id"}))
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_favorite;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
}