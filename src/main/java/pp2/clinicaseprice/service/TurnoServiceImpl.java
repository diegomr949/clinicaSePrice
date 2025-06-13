package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.TurnoDTO;
import pp2.clinicaseprice.exception.RecursoNoEncontradoException;
import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.repository.PacienteRepository; // Asegurarse de importar PacienteRepository
import pp2.clinicaseprice.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service // Marca esta clase como un componente de servicio de Spring.
public class TurnoServiceImpl implements TurnoService {

    private final TurnoRepository repo;
    private final PacienteRepository pacienteRepo;

    public TurnoServiceImpl(TurnoRepository repo, PacienteRepository pacienteRepo) { // Constructor para inyectar los repositorios.
        this.repo = repo;
        this.pacienteRepo = pacienteRepo;
    }

    @Override
    public List<Turno> listar() { // Lista todos los turnos.
        return repo.findAll();
    }

    @Override
    public Turno guardar(TurnoDTO turnoDto) { // Guarda un nuevo turno a partir de un DTO.
        // Buscar el Paciente por su ID
        Paciente paciente = pacienteRepo.findById(turnoDto.getPacienteId()) // Busca el paciente por su ID.
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado con ID: " + turnoDto.getPacienteId())); // Lanza excepción si el paciente no existe.

        Turno turno = new Turno(); // Crea una nueva instancia de Turno.
        turno.setPaciente(paciente); // Asigna el objeto Paciente encontrado al turno.
        turno.setEspecialidad(turnoDto.getEspecialidad()); // Establece la especialidad del turno.
        // Convertir String a LocalDate y LocalTime
        turno.setFecha(LocalDate.parse(turnoDto.getFecha())); // Convierte la fecha de String a LocalDate y la asigna al turno.
        turno.setHora(LocalTime.parse(turnoDto.getHora())); // Convierte la hora de String a LocalTime y la asigna al turno.
        turno.setEstado(turnoDto.getEstado()); // Establece el estado del turno.

        return repo.save(turno); // Guarda el nuevo turno en la base de datos.
    }

    @Override
    public void cancelar(Long id) { // Cancela un turno por su ID.
        // Considerar el manejo de RecursoNoEncontradoException aquí también
        Turno turno = repo.findById(id).orElseThrow( // Busca el turno por su ID.
                () -> new RecursoNoEncontradoException("Turno no encontrado con ID: " + id) // Lanza excepción si el turno no existe.
        );
        turno.setEstado(Turno.EstadoTurno.CANCELADO); // Cambia el estado del turno a CANCELADO.
        repo.save(turno); // Guarda la actualización del turno.
    }

    @Override
    public List<Turno> listarPorPaciente(Long pacienteId) { // Lista los turnos de un paciente específico.
        return repo.findByPacienteId(pacienteId);
    }
}
