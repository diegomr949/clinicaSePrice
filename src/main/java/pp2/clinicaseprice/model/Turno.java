package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate; // Importar LocalDate
import java.time.LocalTime; // Importar LocalTime

@Entity // Marca esta clase como una entidad JPA.
@Getter @Setter // Genera automáticamente los métodos getter y setter para todos los campos.
@Table(name = "turnos") // Especifica el nombre de la tabla en la base de datos.
public class Turno {

    @Id // Marca el campo como la clave primaria de la entidad.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura la generación automática del ID.
    private Long id; // ID único del turno.

    @ManyToOne // Establece una relación muchos a uno con la entidad Paciente.
    @JoinColumn(name = "paciente_id", nullable = false) // Define la columna de unión y sus restricciones.
    private Paciente paciente; // El paciente asociado a este turno.

    private String especialidad; // Define la especialidad médica del turno.

    // Se cambió a LocalDate para almacenar solo la fecha
    private LocalDate fecha; // Almacena la fecha del turno.

    // Se cambió a LocalTime para almacenar solo la hora
    private LocalTime hora;  // Almacena la hora del turno.

    @Enumerated(EnumType.STRING) // Mapea el enum a su representación String en la base de datos.
    private EstadoTurno estado = EstadoTurno.ASIGNADO; // El estado actual del turno.

    public enum EstadoTurno { // Define los posibles estados de un turno.
        ASIGNADO, CANCELADO, ATENDIDO
    }
}

