package proyecto_final_equipo3.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.dto.GenreImageResponse;
import proyecto_final_equipo3.backend.model.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Integer> {

    @Query(value =
            "SELECT " +
                    "    derivedTable.genre, " +
                    "    derivedTable.image_urls, " +
                    "    derivedTable.movieCount " +
                    "FROM ( " +
                    "    SELECT " +
                    "        genre, " +
                    "        SUBSTRING_INDEX(image_urls, ',', 1) as image_urls, " +
                    "        ROW_NUMBER() OVER(PARTITION BY genre ORDER BY id) as rn, " +
                    "        COUNT(*) OVER(PARTITION BY genre) as movieCount " +
                    "    FROM movies " +
                    ") AS derivedTable " +
                    "WHERE derivedTable.rn = 1 " +
                    "ORDER BY derivedTable.movieCount DESC;",
            nativeQuery = true)
    List<GenreImageResponse> findGroupedByGenreWithImage();
}
