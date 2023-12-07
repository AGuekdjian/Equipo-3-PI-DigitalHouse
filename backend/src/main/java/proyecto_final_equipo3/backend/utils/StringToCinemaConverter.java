package proyecto_final_equipo3.backend.utils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import proyecto_final_equipo3.backend.model.Cinema;

@Component
public class StringToCinemaConverter implements Converter<String, Cinema> {

    @Override
    public Cinema convert(String source) {
        try {
            return Cinema.valueOf(source.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid value for Cinema Enum: " + source);
        }
    }
}
