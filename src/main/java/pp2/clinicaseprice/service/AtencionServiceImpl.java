package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.AtencionDTO;
import pp2.clinicaseprice.exception.RecursoNoEncontradoException;
import pp2.clinicaseprice.model.Atencion;
import pp2.clinicaseprice.model.Paciente; // Se mantiene la importación por si se usa en otro lado, pero no se usará directamente para buscar paciente aquí
import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.repository.AtencionRepository;
import pp2.clinicaseprice.repository.PacienteRepository;
import pp2.clinicaseprice.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime; // Importar LocalDateTime
import java.util.List;

@Service
public class AtencionServiceImpl implements AtencionService {

    private final AtencionRepository atencionRepo;
    private final TurnoRepository turnoRepo;
    private final PacienteRepository pacienteRepo; // Se mantiene, pero la búsqueda de paciente por ID del DTO se elimina

    public AtencionServiceImpl(AtencionRepository atencionRepo,
                               TurnoRepository turnoRepo,
                               PacienteRepository pacienteRepo) {
        this.atencionRepo = atencionRepo;
        this.turnoRepo = turnoRepo;
        this.pacienteRepo = pacienteRepo;
    }

    @Override
    public List<Atencion> listar() {
        return atencionRepo.findAll();
    }

    @Override
    public Atencion guardar(Atencion atencion) {
        if (!turnoRepo.existsById(atencion.getTurno().getId())) {
            throw new RuntimeException("El turno no existe");
        }
        return atencionRepo.save(atencion);
    }

    @Override
    public Atencion registrar(AtencionDTO dto) {
        // Se elimina la búsqueda de paciente por ID del DTO, ya que AtencionDTO ya no lo contiene.
        // El paciente se asocia a través del Turno.
        Turno turno = turnoRepo.findById(dto.getTurnoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Turno no encontrado"));

        // Se asume que este cambio de estado a ATENDIDO ocurre al registrar la atención.
        turno.setEstado(Turno.EstadoTurno.ATENDIDO);
        turnoRepo.save(turno);

        Atencion atencion = new Atencion();
        atencion.setTurno(turno);
        atencion.setDiagnostico(dto.getDiagnostico());
        // Establecer la fecha y hora de la atención al momento del registro
        atencion.setFechaAtencion(LocalDateTime.now()); // Establece la fecha y hora actuales

        return atencionRepo.save(atencion);
    }
}
