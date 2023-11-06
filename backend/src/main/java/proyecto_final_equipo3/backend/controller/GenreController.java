package proyecto_final_equipo3.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import proyecto_final_equipo3.backend.controller.abstracts.AbstractCrudController;
import proyecto_final_equipo3.backend.model.Genre;
import proyecto_final_equipo3.backend.service.GenreService;

import java.util.List;

@RestController
@RequestMapping(EndsPointInternal.GENRE)
public class GenreController extends AbstractCrudController<Genre, GenreService> {

    @Autowired
    public GenreController(GenreService service) {
        super(service);
    }

}
