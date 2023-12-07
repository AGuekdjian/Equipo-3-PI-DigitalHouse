package proyecto_final_equipo3.backend.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import proyecto_final_equipo3.backend.dto.MovieCalendarDtoCreate;
import proyecto_final_equipo3.backend.dto.MovieCalendarDtoUpdate;
import proyecto_final_equipo3.backend.exceptions.particular.BadRequestException;
import proyecto_final_equipo3.backend.exceptions.particular.DuplicateEntryException;
import proyecto_final_equipo3.backend.exceptions.particular.ForeignKeyException;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;
import proyecto_final_equipo3.backend.model.Genre;
import proyecto_final_equipo3.backend.model.Movie;
import proyecto_final_equipo3.backend.model.MovieCalendar;
import proyecto_final_equipo3.backend.persistence.MovieCalendarRepository;
import proyecto_final_equipo3.backend.persistence.MovieRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class MovieCalendarService {

    @Autowired
    private MovieCalendarRepository repository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MovieRepository movieRepository;

    public MovieCalendar create(MovieCalendarDtoCreate movieCalendarDtoCreate) throws DuplicateEntryException, ForeignKeyException {
        try {
            Movie movie = movieRepository.findById(movieCalendarDtoCreate.getMovieId()).orElseThrow(() -> new BadRequestException("Movie not found"));

            MovieCalendar movieCalendar = new MovieCalendar();
            movieCalendar.setMovie(movie);
            movieCalendar.setDate(movieCalendarDtoCreate.getDate());
            movieCalendar.setTime(movieCalendarDtoCreate.getTime());
            movieCalendar.setAvailable_seats(movieCalendarDtoCreate.getTotal_seats());
            movieCalendar.setTotal_seats(movieCalendarDtoCreate.getTotal_seats());
            movieCalendar.setCinema(movieCalendarDtoCreate.getCinema());

            return repository.save(movieCalendar);
        } catch (DataIntegrityViolationException ex) {
            if (ex.getMessage().contains("Duplicate entry")) {
                throw new DuplicateEntryException(ex.getMessage());
            }
            if (ex.getMessage().contains("foreign key constraint")) {
                throw new ForeignKeyException(ex.getMessage());
            }
            throw ex;
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
    }

    public MovieCalendar findById(Integer id) throws ItemNotFoundException {
        Optional<MovieCalendar> movieCalendar = repository.findById(id);
        return movieCalendar.orElseThrow(() -> new ItemNotFoundException("Entity not found with id: " + id));
    }

    public Page<MovieCalendar> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
    public MovieCalendar delete(Integer id) throws ItemNotFoundException {
        Optional<MovieCalendar> movieCalendar = repository.findById(id);
        if (movieCalendar.isEmpty()) {
            throw new ItemNotFoundException("Entity not found with id: " + id);
        }
        repository.deleteById(id);
        return movieCalendar.get();
    }

    public MovieCalendar update(MovieCalendarDtoUpdate movieCalendarDtoUpdate) throws ItemNotFoundException {
        Integer movieCalendarId = movieCalendarDtoUpdate.getId();
        if (!repository.existsById(movieCalendarId)) {
            throw new ItemNotFoundException("Entity not found with id: " + movieCalendarId);
        }
        MovieCalendar existingEntity = findById(movieCalendarId);
        modelMapper.map(movieCalendarDtoUpdate, existingEntity);
        return repository.save(existingEntity);
    }

    private LocalDate parseDate(String dateString) {
        try {
            return LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (Exception e) {
            return null;
        }
    }



}