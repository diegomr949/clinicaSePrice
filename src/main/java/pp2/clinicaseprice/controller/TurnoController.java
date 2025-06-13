package pp2.clinicaseprice.controller;

import pp2.clinicaseprice.dto.TurnoDTO; // Importar TurnoDTO
import pp2.clinicaseprice.model.Turno;
import pp2.clinicaseprice.service.TurnoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turnos")
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen. Considera restringirlo en producción.
public class TurnoController {

    private final TurnoService servicio;

    public TurnoController(TurnoService servicio) { // Constructor para inyectar el servicio de Turno.
        this.servicio = servicio;
    }

    /**
     * Obtiene una lista de todos los turnos.
     * Requiere el rol PACIENTE o SECRETARIA.
     */
    @GetMapping // Mapea solicitudes GET para listar todos los turnos.
    public List<Turno> listarTurnos() {
        return servicio.listar();
    }

    /**
     * Asigna un nuevo turno utilizando un DTO que incluye el ID del paciente.
     * Requiere el rol PACIENTE o SECRETARIA.
     * @param turnoDto El objeto TurnoDTO que contiene los datos del turno y el ID del paciente.
     * @return El turno asignado.
     */
    @PostMapping // Mapea solicitudes POST para asignar un nuevo turno.
    public Turno asignarTurno(@RequestBody TurnoDTO turnoDto) { // Cambiado a TurnoDTO
        return servicio.guardar(turnoDto); // Modificado para aceptar TurnoDTO
    }

    /**
     * Cancela un turno por su ID.
     * Requiere el rol PACIENTE o SECRETARIA.
     * @param id El ID del turno a cancelar.
     */
    @PutMapping("/{id}/cancelar") // Mapea solicitudes PUT para cancelar un turno por su ID.
    public void cancelarTurno(@PathVariable Long id) {
        servicio.cancelar(id);
    }

    /**
     * Obtiene una lista de turnos para un paciente específico.
     * Requiere el rol PACIENTE.
     * @param id El ID del paciente.
     * @return Una lista de turnos del paciente.
     */
    @GetMapping("/paciente/{id}") // Mapea solicitudes GET para obtener turnos por ID de paciente.
    public List<Turno> obtenerTurnosPorPaciente(@PathVariable Long id) {
        return servicio.listarPorPaciente(id);
    }
}