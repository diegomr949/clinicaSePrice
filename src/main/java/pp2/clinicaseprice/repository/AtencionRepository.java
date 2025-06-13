package pp2.clinicaseprice.repository;

import pp2.clinicaseprice.model.Atencion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AtencionRepository extends JpaRepository<Atencion, Long> { // Define una interfaz de repositorio para la entidad Atencion.
}
