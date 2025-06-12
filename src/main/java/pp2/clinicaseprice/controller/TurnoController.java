package pp2.clinicaseprice.controller;

import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.service.TurnoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turnos")
@CrossOrigin(origins = "*")
public class TurnoController {

    private final TurnoService servicio;

    public TurnoController(TurnoService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<Turno> listarTurnos() {
        return servicio.listar();
    }

    @PostMapping
    public Turno asignarTurno(@RequestBody Turno turno) {
        return servicio.guardar(turno);
    }

    @PutMapping("/{id}/cancelar")
    public void cancelarTurno(@PathVariable Long id) {
        servicio.cancelar(id);
    }

    @GetMapping("/paciente/{id}")
    public List<Turno> obtenerTurnosPorPaciente(@PathVariable Long id) {
        return servicio.listarPorPaciente(id);
    }
}
