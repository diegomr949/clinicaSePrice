package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime; // Importar LocalDateTime

@Entity
@Getter @Setter
@Table(name = "atenciones")
public class Atencion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "turno_id", nullable = false, unique = true)
    private Turno turno;

    @Column(columnDefinition = "TEXT")
    private String diagnostico;

    // Se cambió a LocalDateTime para almacenar fecha y hora exactas de la atención
    @Column(nullable = false)
    private LocalDateTime fechaAtencion; // Tipo de dato actualizado

}