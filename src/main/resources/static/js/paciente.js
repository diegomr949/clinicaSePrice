// js/paciente.js - Lógica específica del panel de paciente
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para solicitar turno
    const solicitarTurnoForm = document.getElementById('solicitarTurnoForm');
    const solicitarMensaje = document.getElementById('solicitarMensaje');
    if (solicitarTurnoForm) {
        solicitarTurnoForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const especialidad = document.getElementById('especialidad').value;
            const fechaTurno = document.getElementById('fechaTurno').value;
            const horaTurno = document.getElementById('horaTurno').value;

            // TODO: Obtener el ID del paciente autenticado. Esto es crucial.
            // Por ahora, usaremos un ID de paciente ficticio (por ejemplo, 1L).
            // En una aplicación real, esto vendría de la sesión de Spring Security.
            const pacienteId = 1; // ID de paciente de ejemplo

            const turnoData = {
                pacienteId: pacienteId,
                especialidad: especialidad,
                fecha: fechaTurno,
                hora: horaTurno,
                // CAMBIO: Se cambió el estado de "PENDIENTE" a "ASIGNADO"
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
                    solicitarMensaje.textContent = `Turno solicitado exitosamente. ID: ${turno.id}`;
                    solicitarMensaje.style.color = 'green';
                    solicitarTurnoForm.reset();
                } else {
                    const errorText = await response.text();
                    solicitarMensaje.textContent = 'Error al solicitar turno: ' + errorText;
                    solicitarMensaje.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red al solicitar turno:', error);
                solicitarMensaje.textContent = 'Error de conexión. Intente nuevamente.';
                solicitarMensaje.style.color = 'red';
            }
        });
    }

    // Lógica para cancelar turno
    const cancelarTurnoForm = document.getElementById('cancelarTurnoForm');
    const cancelarMensaje = document.getElementById('cancelarMensaje');
    if (cancelarTurnoForm) {
        cancelarTurnoForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const turnoId = document.getElementById('turnoIdCancelar').value;

            try {
                const response = await fetch(`/api/turnos/${turnoId}/cancelar`, {
                    method: 'PUT' // Usamos PUT para actualizar el estado a "cancelado"
                });

                if (response.ok) {
                    cancelarMensaje.textContent = `Turno ID ${turnoId} cancelado exitosamente.`;
                    cancelarMensaje.style.color = 'green';
                    cancelarTurnoForm.reset();
                } else {
                    const errorText = await response.text();
                    cancelarMensaje.textContent = 'Error al cancelar turno: ' + errorText;
                    cancelarMensaje.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red al cancelar turno:', error);
                cancelarMensaje.textContent = 'Error de conexión. Intente nuevamente.';
                cancelarMensaje.style.color = 'red';
            }
        });
    }

    // Lógica para ver mis turnos
    const btnVerTurnos = document.getElementById('btnVerTurnos');
    const listaTurnos = document.getElementById('listaTurnos');
    if (btnVerTurnos) {
        btnVerTurnos.addEventListener('click', async () => {
            // TODO: Obtener el ID del paciente autenticado.
            const pacienteId = 1; // ID de paciente de ejemplo

            try {
                const response = await fetch(`/api/turnos/paciente/${pacienteId}`);
                if (response.ok) {
                    const turnos = await response.json();
                    listaTurnos.innerHTML = ''; // Limpiar lista
                    if (turnos.length === 0) {
                        listaTurnos.innerHTML = '<li>No tienes turnos agendados.</li>';
                    } else {
                        turnos.forEach(turno => {
                            const li = document.createElement('li');
                            li.textContent = `ID: ${turno.id} - Especialidad: ${turno.especialidad} - Fecha: ${turno.fecha} - Hora: ${turno.hora} - Estado: ${turno.estado}`;
                            listaTurnos.appendChild(li);
                        });
                    }
                } else {
                    const errorText = await response.text();
                    listaTurnos.innerHTML = `<li style="color: red;">Error al cargar turnos: ${errorText}</li>`;
                }
            } catch (error) {
                console.error('Error de red al ver turnos:', error);
                listaTurnos.innerHTML = '<li style="color: red;">Error de conexión al cargar turnos.</li>';
            }
        });
    }
});
