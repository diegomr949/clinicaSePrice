package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Atencion;
import pp2.clinicaseprice.repository.AtencionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtencionServiceImpl implements AtencionService {

    private final AtencionRepository repo;

    public AtencionServiceImpl(AtencionRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Atencion> listar() {
        return repo.findAll();
    }

    @Override
    public Atencion guardar(Atencion atencion) {
        return repo.save(atencion);
    }
}
