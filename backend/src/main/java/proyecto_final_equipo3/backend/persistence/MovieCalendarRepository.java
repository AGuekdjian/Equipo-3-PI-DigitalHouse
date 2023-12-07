package proyecto_final_equipo3.backend.persistence;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.SQLUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.model.MovieCalendar;

import java.util.List;

@Repository
public interface MovieCalendarRepository extends JpaRepository<MovieCalendar, Integer> {

    List<MovieCalendar> findByMovieId(Integer movie_id);
    
    @Modifying
    @Transactional
    @Query("UPDATE MovieCalendar m SET m.available_seats = m.available_seats - :seats WHERE m.id = :id")
    Integer updateAvailableSeats(@Param("id") Integer id, @Param("seats") Integer seatsToSubtract);
}