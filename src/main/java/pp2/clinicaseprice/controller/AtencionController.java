package pp2.clinicaseprice.controller;

import jakarta.validation.Valid;
import pp2.clinicaseprice.dto.AtencionDTO;
import pp2.clinicaseprice.model.Atencion;
import pp2.clinicaseprice.service.AtencionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atenciones")
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen. Considera restringirlo en producción.
public class AtencionController {

    private final AtencionService servicio;

    public AtencionController(AtencionService servicio) { // Constructor para inyectar el servicio de Atencion.
        this.servicio = servicio;
    }

    /**
     * Obtiene una lista de todas las atenciones médicas.
     * Requiere el rol MEDICO.
     */
    @GetMapping // Mapea solicitudes GET para listar atenciones.
    public ResponseEntity<List<Atencion>> listarAtenciones() {
        return ResponseEntity.ok(servicio.listar());
    }

    /**
     * Registra una nueva atención médica.
     * Requiere el rol MEDICO.
     * @param dto El objeto AtencionDTO que contiene los datos de la atención.
     * @return La atención médica registrada.
     */
    @PostMapping // Mapea solicitudes POST para registrar una nueva atención.
    public ResponseEntity<Atencion> registrarAtencion(@Valid @RequestBody AtencionDTO dto) {
        Atencion atencion = servicio.registrar(dto);
        return ResponseEntity.ok(atencion);
    }
}
