package proyecto_final_equipo3.backend.dto;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GenreImageResponse {

    private String genre;
    private String url;
    private Integer movie_count;
}