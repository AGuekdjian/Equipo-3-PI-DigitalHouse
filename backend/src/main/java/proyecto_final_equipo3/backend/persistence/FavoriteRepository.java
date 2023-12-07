package proyecto_final_equipo3.backend.persistence;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.model.Favorite;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByUserId(Integer userId);
    
    @Transactional
    void deleteByUserIdAndMovieId(Integer userId, Integer movieId);

    Optional<Favorite> findByUserIdAndMovieId(Integer userId, Integer movieId);
    
}