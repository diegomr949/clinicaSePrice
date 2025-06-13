package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Paciente;
import java.util.List;

public interface PacienteService { // Define la interfaz para el servicio de gestión de pacientes.
    List<Paciente> listar(); // Lista todos los pacientes.
    Paciente guardar(Paciente paciente); // Guarda un paciente.
    void eliminar(Long id); // Elimina un paciente por su ID.
}