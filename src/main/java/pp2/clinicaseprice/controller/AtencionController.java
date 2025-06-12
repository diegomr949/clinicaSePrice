package pp2.clinicaseprice.controller;

import jakarta.validation.Valid;
import pp2.clinicaseprice.dto.AtencionDTO;
import pp2.clinicaseprice.model.Atencion;
import pp2.clinicaseprice.service.AtencionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pp2.clinicaseprice.dto.AtencionDTO;

import java.util.List;

@RestController
@RequestMapping("/api/atenciones")
@CrossOrigin(origins = "*")
public class AtencionController {

    private final AtencionService servicio;

    public AtencionController(AtencionService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public ResponseEntity<List<Atencion>> listarAtenciones() {
        return ResponseEntity.ok(servicio.listar());
    }

    @PostMapping
    public ResponseEntity<Atencion> registrarAtencion(@Valid @RequestBody AtencionDTO dto) {
        Atencion atencion = servicio.registrar(dto);
        return ResponseEntity.ok(atencion);
    }
}
