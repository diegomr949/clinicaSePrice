package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    private String fecha; // Formato YYYY-MM-DD
    private String hora;  // Formato HH:MM

    @Enumerated(EnumType.STRING)
    private EstadoTurno estado = EstadoTurno.ASIGNADO;

    public enum EstadoTurno {
        ASIGNADO, CANCELADO, ATENDIDO
    }
}
