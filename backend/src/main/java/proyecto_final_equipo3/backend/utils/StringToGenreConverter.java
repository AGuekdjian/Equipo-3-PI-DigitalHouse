package proyecto_final_equipo3.backend.utils;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import proyecto_final_equipo3.backend.model.Genre;

@Component
public class StringToGenreConverter implements Converter<String, Genre> {

    @Override
    public Genre convert(String source) {
        try {
            return Genre.valueOf(source.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid value for Genre Enum: " + source);
        }
    }
}
