package pp2.clinicaseprice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import pp2.clinicaseprice.model.Turno;

@Getter @Setter // Genera automáticamente los métodos getter y setter para todos los campos.
public class TurnoDTO {

    @NotNull(message = "El ID del paciente es obligatorio") // Valida que el ID del paciente no sea nulo.
    private Long pacienteId; // Representa el ID del paciente asociado al turno.

    @NotBlank(message = "La especialidad es obligatoria") // Valida que la especialidad no esté en blanco.
    private String especialidad; // Define la especialidad médica del turno.

    @NotBlank(message = "La fecha es obligatoria") // Valida que la fecha no esté en blanco.
    private String fecha; // Almacena la fecha del turno como String (ej. "YYYY-MM-DD").

    @NotBlank(message = "La hora es obligatoria") // Valida que la hora no esté en blanco.
    private String hora;  // Almacena la hora del turno como String (ej. "HH:MM").

    @NotNull(message = "El estado del turno es obligatorio") // Valida que el estado del turno no sea nulo.
    private Turno.EstadoTurno estado; // Define el estado del turno (ASIGNADO, CANCELADO, ATENDIDO).
}

