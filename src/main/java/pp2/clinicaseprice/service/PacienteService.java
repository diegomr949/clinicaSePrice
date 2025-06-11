package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Paciente;
import java.util.List;

public interface PacienteService {
    List<Paciente> listar();
    Paciente guardar(Paciente paciente);
    void eliminar(Long id);
}
