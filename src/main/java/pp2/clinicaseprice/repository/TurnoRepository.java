package pp2.clinicaseprice.repository;

import pp2.clinicaseprice.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> { // Define una interfaz de repositorio para la entidad Turno.
    List<Turno> findByPacienteId(Long pacienteId); // Busca y devuelve una lista de turnos asociados a un ID de paciente.
}
