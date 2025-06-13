package pp2.clinicaseprice.controller;

import pp2.clinicaseprice.model.Paciente;
import pp2.clinicaseprice.service.PacienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen. Considera restringirlo en producción.
public class PacienteController {

    private final PacienteService servicio;

    public PacienteController(PacienteService servicio) {
        this.servicio = servicio;
    }

    /**
     * Obtiene una lista de todos los pacientes registrados.
     * Requiere el rol SECRETARIA.
     */
    @GetMapping
    public List<Paciente> listarPacientes() {
        return servicio.listar();
    }

    /**
     * Registra un nuevo paciente.
     * Requiere el rol SECRETARIA.
     * @param paciente El objeto Paciente a guardar.
     * @return El paciente guardado.
     */
    @PostMapping
    public Paciente registrarPaciente(@RequestBody Paciente paciente) {
        return servicio.guardar(paciente);
    }

    /**
     * Elimina un paciente por su ID.
     * Requiere el rol SECRETARIA.
     * @param id El ID del paciente a eliminar.
     */
    @DeleteMapping("/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        servicio.eliminar(id);
    }
}
