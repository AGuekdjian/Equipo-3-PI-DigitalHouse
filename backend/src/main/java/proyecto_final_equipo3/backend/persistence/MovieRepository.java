package proyecto_final_equipo3.backend.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.dto.GenreImageResponse;
import proyecto_final_equipo3.backend.model.Genre;
import proyecto_final_equipo3.backend.model.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Integer> {

    Page<Movie> findByGenre(Genre genre, Pageable pageable);

    @Query(value = "SELECT * FROM movies m WHERE " +
            "LOWER(m.title) REGEXP LOWER(?1)",
            nativeQuery = true)
    Page<Movie> findByTitleWithRegex(String regexPattern, Pageable pageable);


    @Query("SELECT m.title FROM Movie m")
    List<String> findAllTitles();
}
