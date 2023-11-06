package proyecto_final_equipo3.backend.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import proyecto_final_equipo3.backend.exceptions.particular.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
@RestControllerAdvice
public class GlobalException {

    @Value("${app.env}")
    private String appEnvironment;

    private static final Logger logger = LogManager.getLogger(GlobalException.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errorsMap = new LinkedHashMap<>();
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            errorsMap.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.INCORRECT_BODY);
        errorMap.put("error_message", errorsMap.toString());
        logger.error(errorMap);
        return errorMap;
    }
    @ExceptionHandler(ItemNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
        public Map<String, String> handleResourceNotFoundException(ItemNotFoundException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.ITEM_NOT_FOUND);
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return errorMap;
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.INCORRECT_BODY);
        if (!"production".equals(appEnvironment)) {
            errorMap.put("error_message", ex.getMessage());
        }
        logger.error(errorMap);
        return errorMap;
    }

    @ExceptionHandler(DuplicateEntryException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleDuplicateResourceException(DuplicateEntryException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.DUPLICATE_ENTRY);
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return errorMap;
    }

    @ExceptionHandler(ForeignKeyException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleForeignKeyException(ForeignKeyException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.FOREIGN_KEY);
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return errorMap;
    }

    @ExceptionHandler(RegisterErrorException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleRegisterErrorException(RegisterErrorException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.REGISTER_ERROR);
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return errorMap;
    }

    @ExceptionHandler(ExternalServiceException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleExternalServiceException(ExternalServiceException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ex.getErrorCode());
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return errorMap;
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleBadRequest(BadRequestException ex) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return errorMap;
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherError(Exception ex, WebRequest req) {
        Map<String, String> errorMap = new LinkedHashMap<>();
        errorMap.put("error_code", ErrorList.NOT_MAPPED_ERROR);
        errorMap.put("error_message", ex.getMessage());
        logger.error(errorMap);
        return new ResponseEntity<>(errorMap, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
