package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.TurnoDTO; // Importar TurnoDTO
import pp2.clinicaseprice.model.Turno;
import java.util.List;

public interface TurnoService {
    List<Turno> listar();
    Turno guardar(TurnoDTO turnoDto); // Modificado para aceptar TurnoDTO
    void cancelar(Long id);
    List<Turno> listarPorPaciente(Long pacienteId);
}
