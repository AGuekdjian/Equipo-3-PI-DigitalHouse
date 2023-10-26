package proyecto_final_equipo3.backend.exceptions.particular;

import lombok.Getter;

@Getter
public class ExternalServiceException extends Exception {

    private final String errorCode;

    public ExternalServiceException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

}
