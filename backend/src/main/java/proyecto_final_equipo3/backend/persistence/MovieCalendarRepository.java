package proyecto_final_equipo3.backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.model.MovieCalendar;

@Repository
public interface MovieCalendarRepository extends JpaRepository<MovieCalendar, Integer> {
    
}