package pp2.clinicaseprice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice // Indica que esta clase maneja excepciones de controladores REST globalmente.
public class GlobalExceptionHandler {

    // ⚠️ Solo UNO → usaremos 409 CONFLICT para recursos duplicados como DNI existente
    @ExceptionHandler(RecursoNoEncontradoException.class) // Maneja excepciones de tipo RecursoNoEncontradoException.
    public ResponseEntity<String> manejarRecursoNoEncontrado(RecursoNoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage()); // Devuelve una respuesta 409 CONFLICT con el mensaje de la excepción.
    }

    @ExceptionHandler(MethodArgumentNotValidException.class) // Maneja excepciones de validación de argumentos de método.
    public ResponseEntity<String> manejarValidacion(MethodArgumentNotValidException ex) {
        var mensaje = ex.getBindingResult().getFieldError().getDefaultMessage(); // Obtiene el mensaje de error de validación.
        return ResponseEntity.badRequest().body(mensaje); // Devuelve una respuesta 400 Bad Request con el mensaje de error.
    }
}

