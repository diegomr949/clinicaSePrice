package pp2.clinicaseprice.service;

import pp2.clinicaseprice.exception.RecursoNoEncontradoException; // Importar la excepción
import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Marca esta clase como un componente de servicio de Spring.
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository repo;

    public PacienteServiceImpl(PacienteRepository repo) { // Constructor para inyectar el repositorio de Paciente.
        this.repo = repo;
    }

    @Override
    public List<Paciente> listar() { // Lista todos los pacientes registrados.
        return repo.findAll();
    }

    @Override
    public Paciente guardar(Paciente paciente) { // Guarda un nuevo paciente, validando que el DNI no exista.
        // Validación: Verificar si ya existe un paciente con el mismo DNI
        if (repo.existsByDni(paciente.getDni())) { // Verifica si ya existe un paciente con el DNI proporcionado.
            // Lanza una excepción si el DNI ya está registrado
            throw new RecursoNoEncontradoException("Ya existe un paciente registrado con el DNI: " + paciente.getDni()); // Lanza una excepción si el DNI es duplicado.
        }
        return repo.save(paciente); // Guarda el paciente en la base de datos.
    }

    @Override
    public void eliminar(Long id) { // Elimina un paciente por su ID.
        repo.deleteById(id);
    }
}