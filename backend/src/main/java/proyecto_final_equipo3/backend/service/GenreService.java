package proyecto_final_equipo3.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_final_equipo3.backend.model.Genres;
import proyecto_final_equipo3.backend.persistence.GenreRepository;
import proyecto_final_equipo3.backend.service.abstracts.AbstractCrudService;
import proyecto_final_equipo3.backend.service.abstracts.BaseInterfaceService;
@Service
public class GenreService extends AbstractCrudService<Genres, Integer, GenreRepository> implements BaseInterfaceService<Genres> {
    @Autowired
    public GenreService(GenreRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper);
    }

    @Override
    protected Integer getEntityId(Genres genre) {
        return genre.getId();
    }

}
