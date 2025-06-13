package pp2.clinicaseprice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter // Genera automáticamente los métodos getter y setter para todos los campos.
public class AtencionDTO {

    // Se eliminó pacienteId, ya que se puede obtener a través del Turno
    @NotNull(message = "El ID del turno es obligatorio") // Valida que el ID del turno no sea nulo.
    private Long turnoId; // Representa el ID del turno al que se asocia la atención.

    @NotNull(message = "El diagnóstico es obligatorio") // Valida que el diagnóstico no sea nulo.
    private String diagnostico; // Contiene el diagnóstico o las observaciones de la atención.
}