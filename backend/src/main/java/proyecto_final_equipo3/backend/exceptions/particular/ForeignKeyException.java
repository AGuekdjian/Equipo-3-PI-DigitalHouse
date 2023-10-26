package proyecto_final_equipo3.backend.exceptions.particular;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ForeignKeyException extends Exception {
    public ForeignKeyException(String message) {
        super(message);
    }
}