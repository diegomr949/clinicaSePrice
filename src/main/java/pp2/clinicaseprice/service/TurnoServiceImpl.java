package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.TurnoDTO; // Importar TurnoDTO
import pp2.clinicaseprice.exception.RecursoNoEncontradoException;
import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.repository.PacienteRepository; // Asegurarse de importar PacienteRepository
import pp2.clinicaseprice.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate; // Importar LocalDate
import java.time.LocalTime; // Importar LocalTime
import java.util.List;

@Service
public class TurnoServiceImpl implements TurnoService {

    private final TurnoRepository repo;
    private final PacienteRepository pacienteRepo; // Inyectar PacienteRepository

    public TurnoServiceImpl(TurnoRepository repo, PacienteRepository pacienteRepo) { // Modificar constructor
        this.repo = repo;
        this.pacienteRepo = pacienteRepo;
    }

    @Override
    public List<Turno> listar() {
        return repo.findAll();
    }

    @Override
    public Turno guardar(TurnoDTO turnoDto) { // Modificado para aceptar TurnoDTO
        // Buscar el Paciente por su ID
        Paciente paciente = pacienteRepo.findById(turnoDto.getPacienteId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado con ID: " + turnoDto.getPacienteId()));

        Turno turno = new Turno();
        turno.setPaciente(paciente); // Asignar el objeto Paciente encontrado
        turno.setEspecialidad(turnoDto.getEspecialidad());
        // Convertir String a LocalDate y LocalTime
        turno.setFecha(LocalDate.parse(turnoDto.getFecha()));
        turno.setHora(LocalTime.parse(turnoDto.getHora()));
        turno.setEstado(turnoDto.getEstado());

        return repo.save(turno);
    }

    @Override
    public void cancelar(Long id) {
        // Considerar el manejo de RecursoNoEncontradoException aquí también
        Turno turno = repo.findById(id).orElseThrow(
                () -> new RecursoNoEncontradoException("Turno no encontrado con ID: " + id)
        );
        turno.setEstado(Turno.EstadoTurno.CANCELADO);
        repo.save(turno);
    }

    @Override
    public List<Turno> listarPorPaciente(Long pacienteId) {
        return repo.findByPacienteId(pacienteId);
    }
}