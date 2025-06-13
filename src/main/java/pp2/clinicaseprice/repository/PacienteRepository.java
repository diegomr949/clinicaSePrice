package pp2.clinicaseprice.repository;

import pp2.clinicaseprice.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> { // Define una interfaz de repositorio para la entidad Paciente.
    boolean existsByDni(String dni); // Verifica si existe un paciente con un DNI dado.
}
