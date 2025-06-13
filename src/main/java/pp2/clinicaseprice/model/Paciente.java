package pp2.clinicaseprice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity // Marca esta clase como una entidad JPA.
@Getter @Setter // Genera automáticamente los métodos getter y setter para todos los campos.
@Table(name = "pacientes") // Especifica el nombre de la tabla en la base de datos.
public class Paciente {

    @Id // Marca el campo como la clave primaria de la entidad.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura la generación automática del ID.
    private Long id; // ID único del paciente.

    private String nombre; // Nombre completo del paciente.

    @Column(unique = true) // Mapea el campo a una columna con restricción de unicidad.
    private String dni; // Número de DNI del paciente (debe ser único).

    private String email; // Dirección de correo electrónico del paciente.
}