package pp2.clinicaseprice.service;

import pp2.clinicaseprice.dto.AtencionDTO;
import pp2.clinicaseprice.model.Atencion;
import java.util.List;

public interface AtencionService { // Define la interfaz para el servicio de gestión de atenciones.
    List<Atencion> listar(); // Lista todas las atenciones.
    Atencion guardar(Atencion atencion); // Guarda una atención.
    Atencion registrar(AtencionDTO dto); // Registra una nueva atención usando un DTO.
}
