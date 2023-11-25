package proyecto_final_equipo3.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import proyecto_final_equipo3.backend.dto.GenreImageResponse;
import proyecto_final_equipo3.backend.model.Genre;
import proyecto_final_equipo3.backend.model.Movie;
import proyecto_final_equipo3.backend.persistence.MovieRepository;
import proyecto_final_equipo3.backend.service.abstracts.AbstractCrudService;
import proyecto_final_equipo3.backend.service.abstracts.BaseInterfaceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieService extends AbstractCrudService<Movie, Integer, MovieRepository> implements BaseInterfaceService<Movie> {
    @Autowired
    public MovieService(MovieRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper);
    }

    @Override
    protected Integer getEntityId(Movie movie) {
        return movie.getId();
    }

    public List<GenreImageResponse> findGroupedByGenreWithImage() {
        List<Movie> allMovies = repository.findAll();
        Map<Genre, GenreImageResponse> genreMap = new HashMap<>();
        for (Movie movie : allMovies) {
            if (!genreMap.containsKey(movie.getGenre())) {
                GenreImageResponse response = new GenreImageResponse();
                response.setGenre(String.valueOf(movie.getGenre()));
                response.setUrl(movie.getImage_urls().isEmpty() ? null : movie.getImage_urls().get(0));
                response.setMovie_count(1);

                genreMap.put(movie.getGenre(), response);
            } else {
                GenreImageResponse existingResponse = genreMap.get(movie.getGenre());
                existingResponse.setMovie_count(existingResponse.getMovie_count() + 1);
            }
        }

        return new ArrayList<>(genreMap.values());
    }

    public Page<Movie> findByGenre(Genre genre, Pageable pageable) {
        return repository.findByGenre(genre, pageable);
    }

    public Page<Movie> findByTitle(String title, Pageable pageable) {
        String regexPattern = Arrays.stream(title.split("\\s+"))
                .map(word -> "(?=.*" + word + ")")
                .collect(Collectors.joining());
        return repository.findByTitleWithRegex(regexPattern, pageable);
    }

    public List<String> getAllMovieTitles() {
        return repository.findAllTitles();
    }
}