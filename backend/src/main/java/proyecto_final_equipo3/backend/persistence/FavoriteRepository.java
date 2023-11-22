package proyecto_final_equipo3.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto_final_equipo3.backend.model.Favorite;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByUserId(Integer userId);
    void deleteByUserIdAndMovieId(Integer userId, Integer movieId);
}