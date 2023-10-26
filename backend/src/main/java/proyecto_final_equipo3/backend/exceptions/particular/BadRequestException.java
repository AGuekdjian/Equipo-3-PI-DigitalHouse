package proyecto_final_equipo3.backend.exceptions.particular;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadRequestException extends Exception{
    public BadRequestException(String message) {
        super(message);
    }
}