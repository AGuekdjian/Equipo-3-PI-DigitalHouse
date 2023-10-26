package proyecto_final_equipo3.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.controller.abstracts.AbstractCrudController;
import proyecto_final_equipo3.backend.dto.GenreImageResponse;
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

}