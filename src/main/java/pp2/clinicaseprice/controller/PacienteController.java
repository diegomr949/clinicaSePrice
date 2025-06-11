package pp2.clinicaseprice.controller;

import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.service.PacienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    private final PacienteService servicio;

    public PacienteController(PacienteService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<Paciente> listarPacientes() {
        return servicio.listar();
    }

    @PostMapping
    public Paciente registrarPaciente(@RequestBody Paciente paciente) {
        return servicio.guardar(paciente);
    }

    @DeleteMapping("/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        servicio.eliminar(id);
    }
}
