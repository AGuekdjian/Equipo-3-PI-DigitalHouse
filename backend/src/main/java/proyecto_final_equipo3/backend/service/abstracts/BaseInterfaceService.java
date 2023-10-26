package proyecto_final_equipo3.backend.service.abstracts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import proyecto_final_equipo3.backend.exceptions.particular.DuplicateEntryException;
import proyecto_final_equipo3.backend.exceptions.particular.ForeignKeyException;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;

import java.util.List;

public interface BaseInterfaceService<T> {
    Page<T> findAll(Pageable pageable);

    T findById(Integer id) throws ItemNotFoundException;

    T create(T entity) throws DuplicateEntryException, ItemNotFoundException, ForeignKeyException;

    void update(T entity) throws ItemNotFoundException;

    void delete(Integer id) throws ItemNotFoundException;
}
