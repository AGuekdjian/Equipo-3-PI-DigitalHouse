package proyecto_final_equipo3.backend.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import proyecto_final_equipo3.backend.utils.StringToCinemaConverter;
import proyecto_final_equipo3.backend.utils.StringToGenreConverter;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToGenreConverter());
        registry.addConverter(new StringToCinemaConverter());
    }
}