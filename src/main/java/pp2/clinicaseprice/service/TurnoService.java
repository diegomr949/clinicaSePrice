package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.TurnoDTO; // Importar TurnoDTO
import pp2.clinicaseprice.model.Turno;
import java.util.List;

public interface TurnoService { // Define la interfaz para el servicio de gestión de turnos.
    List<Turno> listar(); // Lista todos los turnos.
    Turno guardar(TurnoDTO turnoDto); // Guarda un nuevo turno usando un DTO.
    void cancelar(Long id); // Cancela un turno por su ID.
    List<Turno> listarPorPaciente(Long pacienteId); // Lista los turnos de un paciente específico.
}
