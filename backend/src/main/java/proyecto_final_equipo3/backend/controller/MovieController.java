package proyecto_final_equipo3.backend.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.controller.abstracts.AbstractCrudController;
import proyecto_final_equipo3.backend.dto.GenreImageResponse;
import proyecto_final_equipo3.backend.model.Genre;
import proyecto_final_equipo3.backend.model.Movie;
import proyecto_final_equipo3.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping(EndsPointInternal.MOVIE)
public class MovieController extends AbstractCrudController<Movie, MovieService> {
    @Autowired
    public MovieController(MovieService service) {
        super(service);
    }

    @GetMapping(EndsPointInternal.GENRES)
    public List<GenreImageResponse> getMoviesGroupedByGenreWithImage() {
        return service.findGroupedByGenreWithImage();
    }

    @GetMapping("/filterByGenre")
    public ResponseEntity<?> getMoviesByGenre(@RequestParam("genre") Genre genre, Pageable pageable) {
        return new ResponseEntity<>(service.findByGenre(genre, pageable), HttpStatus.OK);
    }


}