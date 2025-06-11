package pp2.clinicaseprice.repository;

import pp2.clinicaseprice.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    boolean existsByDni(String dni);
}
