package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate; // Importar LocalDate
import java.time.LocalTime; // Importar LocalTime

@Entity
@Getter @Setter
@Table(name = "turnos")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    private String especialidad;

    // Se cambió a LocalDate para almacenar solo la fecha
    private LocalDate fecha; // Tipo de dato actualizado

    // Se cambió a LocalTime para almacenar solo la hora
    private LocalTime hora;  // Tipo de dato actualizado

    @Enumerated(EnumType.STRING)
    private EstadoTurno estado = EstadoTurno.ASIGNADO;

    public enum EstadoTurno {
        ASIGNADO, CANCELADO, ATENDIDO
    }
}

