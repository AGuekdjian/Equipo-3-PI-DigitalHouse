package proyecto_final_equipo3.backend.exceptions.particular;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(value = HttpStatus.NOT_FOUND)

public class RegisterErrorException extends Exception {
    public RegisterErrorException(String message) {
        super(message);
    }
}