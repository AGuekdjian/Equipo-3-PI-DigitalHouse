package proyecto_final_equipo3.backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.model.Reserve;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Integer> {
    List<Reserve> findByUserId(Integer userId);
    @Query(value = "SELECT * FROM reserve WHERE user_id = ?1 AND movie_calendar_id = ?2", nativeQuery = true)
    Optional<Reserve> findByUserIdAndMovieCalendarId(Integer userId, Integer movieCalendarId);


    
}