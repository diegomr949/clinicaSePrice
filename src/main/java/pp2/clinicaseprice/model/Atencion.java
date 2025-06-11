package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @Column(nullable = false)
    private String fechaAtencion;
}
