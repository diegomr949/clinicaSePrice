package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Turno;
import java.util.List;

public interface TurnoService {
    List<Turno> listar();
    Turno guardar(Turno turno);
    void cancelar(Long id);
    List<Turno> listarPorPaciente(Long pacienteId);
}
