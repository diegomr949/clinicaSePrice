package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime; // Importar LocalDateTime

@Entity // Marca esta clase como una entidad JPA.
@Getter @Setter // Genera automáticamente los métodos getter y setter para todos los campos.
@Table(name = "atenciones") // Especifica el nombre de la tabla en la base de datos.
public class Atencion {

    @Id // Marca el campo como la clave primaria de la entidad.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura la generación automática del ID.
    private Long id; // ID único de la atención.

    @OneToOne // Establece una relación uno a uno con la entidad Turno.
    @JoinColumn(name = "turno_id", nullable = false, unique = true) // Define la columna de unión y sus restricciones.
    private Turno turno; // El turno asociado a esta atención.

    @Column(columnDefinition = "TEXT") // Mapea el campo a una columna de texto en la base de datos.
    private String diagnostico; // Contiene el diagnóstico o las observaciones de la atención.

    // Se cambió a LocalDateTime para almacenar fecha y hora exactas de la atención
    @Column(nullable = false) // Mapea el campo a una columna que no puede ser nula.
    private LocalDateTime fechaAtencion; // Almacena la fecha y hora exactas de la atención.

}