package proyecto_final_equipo3.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_final_equipo3.backend.model.Feature;
import proyecto_final_equipo3.backend.persistence.FeatureRepository;
import proyecto_final_equipo3.backend.service.abstracts.AbstractCrudService;
import proyecto_final_equipo3.backend.service.abstracts.BaseInterfaceService;

@Service
public class FeatureService extends AbstractCrudService<Feature, Integer, FeatureRepository> implements BaseInterfaceService<Feature> {
    @Autowired
    public FeatureService(FeatureRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper);
    }

    @Override
    protected Integer getEntityId(Feature feature) {
        return feature.getId();
    }

}
