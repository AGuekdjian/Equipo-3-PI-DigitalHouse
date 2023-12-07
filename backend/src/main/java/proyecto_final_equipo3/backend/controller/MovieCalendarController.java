package proyecto_final_equipo3.backend.controller;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_final_equipo3.backend.constants.EndsPointInternal;
import org.springframework.beans.factory.annotation.Autowired;
import proyecto_final_equipo3.backend.dto.MovieCalendarDtoCreate;
import proyecto_final_equipo3.backend.dto.MovieCalendarDtoUpdate;
import proyecto_final_equipo3.backend.exceptions.particular.DuplicateEntryException;
import proyecto_final_equipo3.backend.exceptions.particular.ForeignKeyException;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;
import proyecto_final_equipo3.backend.model.Genre;
import proyecto_final_equipo3.backend.model.MovieCalendar;
import proyecto_final_equipo3.backend.service.MovieCalendarService;

import java.util.List;


@RestController
@RequestMapping(EndsPointInternal.MOVIE_CALENDAR)
public class MovieCalendarController  {
    @Autowired
    private MovieCalendarService service;

    @GetMapping()
    public ResponseEntity<Page<MovieCalendar>> findAll(Pageable pageable){
        return new ResponseEntity<Page<MovieCalendar>>(service.findAll(pageable),HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MovieCalendar> findById(@PathVariable Integer id) throws ItemNotFoundException {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MovieCalendar> create(@Valid @RequestBody MovieCalendarDtoCreate movieCalendarDto) throws ItemNotFoundException, DuplicateEntryException, ForeignKeyException {
        return new ResponseEntity<MovieCalendar>(service.create(movieCalendarDto), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MovieCalendar> update(@Valid @RequestBody MovieCalendarDtoUpdate movieCalendarDtoUpdate) throws ItemNotFoundException {
        return new ResponseEntity<MovieCalendar>(service.update(movieCalendarDtoUpdate),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MovieCalendar> delete(@PathVariable Integer id) throws ItemNotFoundException {
        return new ResponseEntity<MovieCalendar>(service.delete(id),HttpStatus.ACCEPTED);
    }

}