// js/secretaria.js - Lógica específica del panel de secretaría
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para registrar paciente
    const registrarPacienteForm = document.getElementById('registrarPacienteForm');
    const mensajeRegistrar = document.getElementById('mensajeRegistrar');
    if (registrarPacienteForm) {
        registrarPacienteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombrePaciente').value;
            const dni = document.getElementById('dniPaciente').value;
            const email = document.getElementById('emailPaciente').value;

            const pacienteData = {
                nombre: nombre,
                dni: dni,
                email: email
            };

            try {
                const response = await fetch('/api/pacientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pacienteData)
                });

                if (response.ok) {
                    const paciente = await response.json();
                    mensajeRegistrar.textContent = `Paciente ${paciente.nombre} registrado exitosamente. ID: ${paciente.id}`;
                    mensajeRegistrar.style.color = 'green';
                    registrarPacienteForm.reset();
                } else {
                    // Si la respuesta no es OK, intenta leer el error
                    const errorResponse = await response.json(); // Asume que el backend envía JSON para errores
                    if (errorResponse && errorResponse.message) {
                        mensajeRegistrar.textContent = 'Error al registrar paciente: ' + errorResponse.message;
                    } else {
                        mensajeRegistrar.textContent = 'Error al registrar paciente. Por favor, intente de nuevo.';
                    }
                    mensajeRegistrar.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red al registrar paciente:', error);
                mensajeRegistrar.textContent = 'Error de conexión. Intente nuevamente.';
                mensajeRegistrar.style.color = 'red';
            }
        });
    }

    // Lógica para asignar turno
    const asignarTurnoForm = document.getElementById('asignarTurnoForm');
    const mensajeAsignar = document.getElementById('mensajeAsignar');
    if (asignarTurnoForm) {
        asignarTurnoForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const dniPaciente = document.getElementById('dniTurnoPaciente').value;
            const especialidad = document.getElementById('especialidadTurno').value;
            const fecha = document.getElementById('fechaTurnoSec').value;
            const hora = document.getElementById('horaTurnoSec').value;

            // TODO: Buscar paciente por DNI para obtener su ID antes de asignar el turno
            // Por simplicidad, se asume un ID de paciente ficticio.
            // En una aplicación real, harías una llamada a /api/pacientes?dni=...
            const pacienteId = 1; // ID de paciente de ejemplo

            const turnoData = {
                pacienteId: pacienteId,
                especialidad: especialidad,
                fecha: fecha,
                hora: hora,
                // Se cambió el estado de "CONFIRMADO" a "ASIGNADO"
                // para que coincida con los valores aceptados por el enum EstadoTurno del backend.
                estado: "ASIGNADO"
            };

            try {
                const response = await fetch('/api/turnos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(turnoData)
                });

                if (response.ok) {
                    const turno = await response.json();
                    mensajeAsignar.textContent = `Turno asignado exitosamente. ID: ${turno.id}`;
                    mensajeAsignar.style.color = 'green';
                    asignarTurnoForm.reset();
                } else {
                    const errorText = await response.text();
                    mensajeAsignar.textContent = 'Error al asignar turno: ' + errorText;
                    mensajeAsignar.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red al asignar turno:', error);
                mensajeAsignar.textContent = 'Error de conexión. Intente nuevamente.';
                mensajeAsignar.style.color = 'red';
            }
        });
    }

    // Lógica para ver lista de espera (simulada)
    const btnVerListaEspera = document.getElementById('btnVerListaEspera');
    const listaEspera = document.getElementById('listaEspera');
    if (btnVerListaEspera) {
        btnVerListaEspera.addEventListener('click', async () => {
            // En una aplicación real, aquí harías una llamada para obtener turnos pendientes
            try {
                const response = await fetch('/api/turnos'); // Obtener todos los turnos
                if (response.ok) {
                    const turnos = await response.json();
                    // Filtrar turnos con estado "PENDIENTE" para la "lista de espera"
                    const turnosPendientes = turnos.filter(turno => turno.estado === "PENDIENTE"); // Mantener "PENDIENTE" aquí si el backend eventualmente lo soporta

                    listaEspera.innerHTML = ''; // Limpiar lista
                    if (turnosPendientes.length === 0) {
                        listaEspera.innerHTML = '<li>No hay turnos en lista de espera.</li>';
                    } else {
                        turnosPendientes.forEach(turno => {
                            const li = document.createElement('li');
                            li.textContent = `ID: ${turno.id} - Paciente ID: ${turno.paciente.id} - Especialidad: ${turno.especialidad} - Fecha: ${turno.fecha} - Hora: ${turno.hora}`;
                            listaEspera.appendChild(li);
                        });
                    }
                } else {
                    const errorText = await response.text();
                    listaEspera.innerHTML = `<li style="color: red;">Error al cargar lista de espera: ${errorText}</li>`;
                }
            } catch (error) {
                console.error('Error de red al cargar lista de espera:', error);
                listaEspera.innerHTML = '<li style="color: red;">Error de conexión al cargar lista de espera.</li>';
            }
        });
    }
});