package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.AtencionDTO;
import pp2.clinicaseprice.exception.RecursoNoEncontradoException;
import pp2.clinicaseprice.model.Atencion;
import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.repository.AtencionRepository;
import pp2.clinicaseprice.repository.PacienteRepository;
import pp2.clinicaseprice.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service // Marca esta clase como un componente de servicio de Spring.
public class AtencionServiceImpl implements AtencionService {

    private final AtencionRepository atencionRepo;
    private final TurnoRepository turnoRepo;
    private final PacienteRepository pacienteRepo;

    public AtencionServiceImpl(AtencionRepository atencionRepo,
                               TurnoRepository turnoRepo,
                               PacienteRepository pacienteRepo) { // Constructor para inyectar los repositorios necesarios.
        this.atencionRepo = atencionRepo;
        this.turnoRepo = turnoRepo;
        this.pacienteRepo = pacienteRepo;
    }

    @Override
    public List<Atencion> listar() { // Lista todas las atenciones médicas.
        return atencionRepo.findAll();
    }

    @Override
    public Atencion guardar(Atencion atencion) { // Guarda una atención médica existente.
        if (!turnoRepo.existsById(atencion.getTurno().getId())) { // Verifica si el turno asociado existe.
            throw new RuntimeException("El turno no existe");
        }
        return atencionRepo.save(atencion);
    }

    @Override
    public Atencion registrar(AtencionDTO dto) { // Registra una nueva atención médica a partir de un DTO.
        // Se elimina la búsqueda de paciente por ID del DTO, ya que AtencionDTO ya no lo contiene.
        // El paciente se asocia a través del Turno.
        Turno turno = turnoRepo.findById(dto.getTurnoId()) // Busca el turno por su ID.
                .orElseThrow(() -> new RecursoNoEncontradoException("Turno no encontrado")); // Lanza excepción si el turno no existe.

        // Se asume que este cambio de estado a ATENDIDO ocurre al registrar la atención.
        turno.setEstado(Turno.EstadoTurno.ATENDIDO); // Cambia el estado del turno a ATENDIDO.
        turnoRepo.save(turno); // Guarda la actualización del turno.

        Atencion atencion = new Atencion(); // Crea una nueva instancia de Atencion.
        atencion.setTurno(turno); // Asigna el turno encontrado a la atención.
        atencion.setDiagnostico(dto.getDiagnostico()); // Establece el diagnóstico de la atención.
        // Establecer la fecha y hora de la atención al momento del registro
        atencion.setFechaAtencion(LocalDateTime.now()); // Establece la fecha y hora actuales de la atención.

        return atencionRepo.save(atencion); // Guarda la nueva atención en la base de datos.
    }
}
