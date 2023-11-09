package proyecto_final_equipo3.backend.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import proyecto_final_equipo3.backend.model.Genre;

@Converter(autoApply = true)
public class GenreConverter implements AttributeConverter<Genre, String> {

    @Override
    public String convertToDatabaseColumn(Genre genre) {
        if (genre == null) {
            return null;
        }
        return genre.getDisplayName();
    }

    @Override
    public Genre convertToEntityAttribute(String displayName) {
        if (displayName == null) {
            return null;
        }
        for (Genre genre : Genre.values()) {
            if (genre.getDisplayName().equals(displayName)) {
                return genre;
            }
        }
        throw new IllegalArgumentException("A corresponding gender has not been found for the name: " + displayName);
    }
}
