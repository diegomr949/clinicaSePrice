package pp2.clinicaseprice.exception;

public class RecursoNoEncontradoException extends RuntimeException {
    public RecursoNoEncontradoException(String mensaje) { // Constructor que recibe un mensaje de error.
        super(mensaje); // Llama al constructor de la clase padre (RuntimeException) con el mensaje.
    }
}