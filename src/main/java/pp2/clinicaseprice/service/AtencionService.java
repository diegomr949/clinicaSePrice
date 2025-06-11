package pp2.clinicaseprice.service;

import pp2.clinicaseprice.model.Atencion;
import java.util.List;

public interface AtencionService {
    List<Atencion> listar();
    Atencion guardar(Atencion atencion);
}
