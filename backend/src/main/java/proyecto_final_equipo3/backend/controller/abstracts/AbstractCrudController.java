package proyecto_final_equipo3.backend.controller.abstracts;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import proyecto_final_equipo3.backend.exceptions.particular.DuplicateEntryException;
import proyecto_final_equipo3.backend.exceptions.particular.ForeignKeyException;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;
import proyecto_final_equipo3.backend.service.abstracts.BaseInterfaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.Map;

public abstract class AbstractCrudController<T, S extends BaseInterfaceService<T>> {

    protected final S service;

    public AbstractCrudController(S service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) throws ItemNotFoundException {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody T entity) throws ItemNotFoundException, DuplicateEntryException, ForeignKeyException {
        return new ResponseEntity<>(service.create(entity), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> update(@Valid @RequestBody T entity) throws ItemNotFoundException {
        service.update(entity);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ROOT') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) throws ItemNotFoundException {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}