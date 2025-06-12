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

import java.util.List;

@Service
public class AtencionServiceImpl implements AtencionService {

    private final AtencionRepository atencionRepo;
    private final TurnoRepository turnoRepo;
    private final PacienteRepository pacienteRepo;

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
        Paciente paciente = pacienteRepo.findById(dto.getPacienteId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado"));

        Turno turno = turnoRepo.findById(dto.getTurnoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Turno no encontrado"));

        turno.setEstado(Turno.EstadoTurno.ATENDIDO);
        turnoRepo.save(turno);

        Atencion atencion = new Atencion();
        atencion.setTurno(turno);
        atencion.setDiagnostico(dto.getDiagnostico());

        return atencionRepo.save(atencion);
    }
}

