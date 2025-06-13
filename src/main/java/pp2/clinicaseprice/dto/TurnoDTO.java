package pp2.clinicaseprice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import pp2.clinicaseprice.model.Turno;

@Getter @Setter
public class TurnoDTO {

    @NotNull(message = "El ID del paciente es obligatorio")
    private Long pacienteId;

    @NotBlank(message = "La especialidad es obligatoria")
    private String especialidad;

    @NotBlank(message = "La fecha es obligatoria")
    private String fecha; // Se mantiene como String para la entrada HTML, se convertirá en el servicio

    @NotBlank(message = "La hora es obligatoria")
    private String hora;  // Se mantiene como String para la entrada HTML, se convertirá en el servicio

    @NotNull(message = "El estado del turno es obligatorio")
    private Turno.EstadoTurno estado;
}
