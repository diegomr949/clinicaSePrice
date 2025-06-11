package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnoServiceImpl implements TurnoService {

    private final TurnoRepository repo;

    public TurnoServiceImpl(TurnoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Turno> listar() {
        return repo.findAll();
    }

    @Override
    public Turno guardar(Turno turno) {
        return repo.save(turno);
    }

    @Override
    public void cancelar(Long id) {
        Turno turno = repo.findById(id).orElseThrow();
        turno.setEstado(Turno.EstadoTurno.CANCELADO);
        repo.save(turno);
    }
}
