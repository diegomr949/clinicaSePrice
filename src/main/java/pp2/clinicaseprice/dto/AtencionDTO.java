package pp2.clinicaseprice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AtencionDTO {

    @NotNull(message = "El ID del paciente es obligatorio")
    private Long pacienteId;

    @NotNull(message = "El ID del turno es obligatorio")
    private Long turnoId;

    @NotNull(message = "El diagnóstico es obligatorio")
    private String diagnostico;
}
