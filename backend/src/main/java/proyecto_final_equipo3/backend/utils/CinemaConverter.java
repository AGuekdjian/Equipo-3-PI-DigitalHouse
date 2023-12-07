package proyecto_final_equipo3.backend.utils;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import proyecto_final_equipo3.backend.model.Cinema;

@Converter(autoApply = true)
public class CinemaConverter implements AttributeConverter<Cinema, String> {

    @Override
    public String convertToDatabaseColumn(Cinema cinema) {
        if (cinema == null) {
            return null;
        }
        return cinema.getDisplayName();
    }
    @Override
    public Cinema convertToEntityAttribute(String displayName) {
        if (displayName == null) {
            return null;
        }
        for (Cinema cinema : Cinema.values()) {
            if (cinema.getDisplayName().equals(displayName)) {
                return cinema;
            }
        }
        throw new IllegalArgumentException("Dont found a cinema for the name: " + displayName);

    }
}
