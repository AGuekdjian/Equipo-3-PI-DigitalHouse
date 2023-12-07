package proyecto_final_equipo3.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "movies")
@EntityListeners(AuditingEntityListener.class)
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(unique = true)
    private String title;

    @NotNull
    @Column(length = 2000)
    private String overview;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Genre genre;

    @ElementCollection
    @NotNull
    @Column(name = "image_urls")
    private List<String> image_urls = new ArrayList<>();

    @JsonIgnore
    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime created_date;

    @JsonIgnore
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private LocalDateTime last_modified_date;

}
