package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository repo;

    public PacienteServiceImpl(PacienteRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Paciente> listar() {
        return repo.findAll();
    }

    @Override
    public Paciente guardar(Paciente paciente) {
        return repo.save(paciente);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
