package pp2.clinicaseprice.controller;

import pp2.clinicaseprice.model.Atencion;
import pp2.clinicaseprice.service.AtencionService;
import org.springframework.web.bind.annotation.*;

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
    public List<Atencion> listarAtenciones() {
        return servicio.listar();
    }

    @PostMapping
    public Atencion registrarAtencion(@RequestBody Atencion atencion) {
        return servicio.guardar(atencion);
    }
}
