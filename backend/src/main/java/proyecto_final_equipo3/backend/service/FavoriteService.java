package proyecto_final_equipo3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_final_equipo3.backend.exceptions.particular.BadRequestException;
import proyecto_final_equipo3.backend.model.Favorite;
import proyecto_final_equipo3.backend.model.Movie;
import proyecto_final_equipo3.backend.model.UserInfo;
import proyecto_final_equipo3.backend.persistence.FavoriteRepository;
import proyecto_final_equipo3.backend.persistence.MovieRepository;
import proyecto_final_equipo3.backend.persistence.UserInfoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    public Favorite addFavorite(Integer userId, Integer movieId) throws BadRequestException {
        UserInfo user = userInfoRepository.findById(userId).orElseThrow(() -> new BadRequestException("User not found"));
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new BadRequestException("Movie not found"));
        Optional<Favorite> favoriteExist = favoriteRepository.findByUserIdAndMovieId(userId, movieId);
        if (favoriteExist.isPresent()) {
            throw new BadRequestException("Favorite already exists");
        }
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setMovie(movie);
        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(Integer userId, Integer movieId) throws BadRequestException {
        Optional<Favorite> favoriteExist = favoriteRepository.findByUserIdAndMovieId(userId, movieId);
        if (favoriteExist.isEmpty()) {
            throw new BadRequestException("Favorite not found");
        }
        favoriteRepository.deleteByUserIdAndMovieId(userId, movieId);
    }

    public List<Movie> getFavoritesByUser(Integer userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        return favorites.stream().map(Favorite::getMovie).collect(Collectors.toList());
    }
}