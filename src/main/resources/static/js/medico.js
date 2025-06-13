// js/medico.js - Lógica específica del panel de médico
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para ver la agenda médica
    const btnVerAgenda = document.getElementById('btnVerAgenda');
    const listaAgenda = document.getElementById('listaAgenda');
    if (btnVerAgenda) {
        btnVerAgenda.addEventListener('click', async () => {
            // TODO: Implementar filtro por médico si hay varios
            // Por ahora, obtiene todos los turnos y asume que son relevantes para el médico actual.
            try {
                const response = await fetch('/api/turnos'); // O un endpoint específico para la agenda del médico
                if (response.ok) {
                    const turnos = await response.json();
                    listaAgenda.innerHTML = ''; // Limpiar lista
                    if (turnos.length === 0) {
                        listaAgenda.innerHTML = '<li>No hay turnos en la agenda.</li>';
                    } else {
                        turnos.forEach(turno => {
                            const li = document.createElement('li');
                            // Mostrar solo turnos que no estén cancelados o completados
                            if (turno.estado !== 'CANCELADO' && turno.estado !== 'ATENDIDO') { // Corregido a ATENDIDO
                                // Asegúrate de que los campos de fecha y hora se muestren correctamente
                                li.textContent = `ID: ${turno.id} - Paciente ID: ${turno.paciente.id} - Especialidad: ${turno.especialidad} - Fecha: ${turno.fecha} - Hora: ${turno.hora} - Estado: ${turno.estado}`;
                                listaAgenda.appendChild(li);
                            }
                        });
                    }
                } else {
                    const errorText = await response.text();
                    listaAgenda.innerHTML = `<li style="color: red;">Error al cargar agenda: ${errorText}</li>`;
                }
            } catch (error) {
                console.error('Error de red al ver agenda:', error);
                listaAgenda.innerHTML = '<li style="color: red;">Error de conexión al cargar agenda.</li>';
            }
        });
    }

    // Lógica para registrar atención médica
    const atencionMedicaForm = document.getElementById('atencionMedicaForm');
    const mensajeAtencion = document.getElementById('mensajeAtencion');
    if (atencionMedicaForm) {
        atencionMedicaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const turnoId = document.getElementById('turnoIdAtender').value;
            const diagnostico = document.getElementById('diagnostico').value;

            // Se eliminó medicoId ya que no es parte de AtencionDTO
            const atencionData = {
                turnoId: parseInt(turnoId), // Asegurarse de que sea un número
                diagnostico: diagnostico
            };

            try {
                const response = await fetch('/api/atenciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(atencionData)
                });

                if (response.ok) {
                    const atencion = await response.json();
                    mensajeAtencion.textContent = `Atención registrada para el turno ID ${atencion.turno.id}.`; // Acceder a turno.id si Atencion devuelve el objeto Turno completo
                    mensajeAtencion.style.color = 'green';
                    atencionMedicaForm.reset();
                    // Opcional: Actualizar el estado del turno a "COMPLETADO" si es necesario.
                } else {
                    const errorText = await response.text();
                    mensajeAtencion.textContent = 'Error al registrar atención: ' + errorText;
                    mensajeAtencion.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red al registrar atención:', error);
                mensajeAtencion.textContent = 'Error de conexión. Intente nuevamente.';
                mensajeAtencion.style.color = 'red';
            }
        });
    }
});
