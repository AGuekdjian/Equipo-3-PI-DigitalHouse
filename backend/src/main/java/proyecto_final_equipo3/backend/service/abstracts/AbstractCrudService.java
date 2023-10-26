package proyecto_final_equipo3.backend.service.abstracts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import proyecto_final_equipo3.backend.exceptions.particular.DuplicateEntryException;
import proyecto_final_equipo3.backend.exceptions.particular.ForeignKeyException;
import proyecto_final_equipo3.backend.exceptions.particular.ItemNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public abstract class AbstractCrudService<T, ID, R extends JpaRepository<T, ID>> implements BaseInterfaceService<T> {

    protected final R repository;
    protected final ModelMapper modelMapper;

    protected AbstractCrudService(R repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    public T create(T entity) throws DuplicateEntryException, ForeignKeyException {
        try {
            return repository.save(entity);
        } catch (DataIntegrityViolationException ex) {
            if (ex.getMessage().contains("Duplicate entry")) {
                throw new DuplicateEntryException(ex.getMessage());
            }
            if (ex.getMessage().contains("foreign key constraint")) {
                throw new ForeignKeyException(ex.getMessage());
            }
            throw ex;
        }
    }

    public T findById(ID id) throws ItemNotFoundException {
        Optional<T> entityOptional = repository.findById(id);
        return entityOptional.orElseThrow(() -> new ItemNotFoundException("Entity not found with id: " + id));
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public void delete(ID id) throws ItemNotFoundException {
        if (!repository.existsById(id)) {
            throw new ItemNotFoundException("Entity not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public void update(T entity) throws ItemNotFoundException {
        ID entityId = getEntityId(entity);
        if (!repository.existsById(entityId)) {
            throw new ItemNotFoundException("Entity not found with id: " + entityId);
        }
        T existingEntity = findById(entityId);
        modelMapper.map(entity, existingEntity);
        repository.save(existingEntity);
    }

    protected abstract ID getEntityId(T entity);
}