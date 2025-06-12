package pp2.clinicaseprice.repository;

import pp2.clinicaseprice.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByPacienteId(Long pacienteId);
}
