document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado.
    // Lógica para solicitar turno
    const solicitarTurnoForm = document.getElementById('solicitarTurnoForm'); // Obtiene el formulario para solicitar turno.
    const solicitarMensaje = document.getElementById('solicitarMensaje'); // Obtiene el elemento para mensajes de solicitud.
    if (solicitarTurnoForm) { // Verifica si el formulario de solicitud de turno existe.
        solicitarTurnoForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos para el envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.
            const especialidad = document.getElementById('especialidad').value; // Obtiene el valor de la especialidad.
            const fechaTurno = document.getElementById('fechaTurno').value; // Obtiene el valor de la fecha del turno.
            const horaTurno = document.getElementById('horaTurno').value; // Obtiene el valor de la hora del turno.

            // TODO: Obtener el ID del paciente autenticado. Esto es crucial.
            // Por ahora, usaremos un ID de paciente ficticio (por ejemplo, 1L).
            // En una aplicación real, esto vendría de la sesión de Spring Security.
            const pacienteId = 1; // ID de paciente de ejemplo.

            const turnoData = { // Crea el objeto de datos del turno.
                pacienteId: pacienteId, // Asigna el ID del paciente.
                especialidad: especialidad, // Asigna la especialidad.
                fecha: fechaTurno, // Asigna la fecha.
                hora: horaTurno, // Asigna la hora.
                // CAMBIO: Se cambió el estado de "PENDIENTE" a "ASIGNADO"
                // para que coincida con los valores aceptados por el enum EstadoTurno del backend.
                estado: "ASIGNADO" // Asigna el estado del turno.
            };

            try { // Intenta enviar la solicitud del turno.
                const response = await fetch('/api/turnos', { // Envía una solicitud POST a la API de turnos.
                    method: 'POST', // Define el método HTTP como POST.
                    headers: {
                        'Content-Type': 'application/json' // Establece el tipo de contenido del cuerpo.
                    },
                    body: JSON.stringify(turnoData) // Convierte los datos a JSON.
                });

                if (response.ok) { // Si la respuesta es exitosa.
                    const turno = await response.json(); // Parsea la respuesta JSON.
                    solicitarMensaje.textContent = `Turno solicitado exitosamente. ID: ${turno.id}`; // Muestra un mensaje de éxito.
                    solicitarMensaje.style.color = 'green'; // Establece el color del mensaje a verde.
                    solicitarTurnoForm.reset(); // Reinicia el formulario.
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    solicitarMensaje.textContent = 'Error al solicitar turno: ' + errorText; // Muestra un mensaje de error.
                    solicitarMensaje.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al solicitar turno:', error); // Registra el error en la consola.
                solicitarMensaje.textContent = 'Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                solicitarMensaje.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }

    // Lógica para cancelar turno
    const cancelarTurnoForm = document.getElementById('cancelarTurnoForm'); // Obtiene el formulario para cancelar turno.
    const cancelarMensaje = document.getElementById('cancelarMensaje'); // Obtiene el elemento para mensajes de cancelación.
    if (cancelarTurnoForm) { // Verifica si el formulario de cancelación de turno existe.
        cancelarTurnoForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos para el envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.
            const turnoId = document.getElementById('turnoIdCancelar').value; // Obtiene el ID del turno a cancelar.

            try { // Intenta cancelar el turno.
                const response = await fetch(`/api/turnos/${turnoId}/cancelar`, { // Envía una solicitud PUT para cancelar el turno.
                    method: 'PUT' // Usamos PUT para actualizar el estado a "cancelado".
                });

                if (response.ok) { // Si la respuesta es exitosa.
                    cancelarMensaje.textContent = `Turno ID ${turnoId} cancelado exitosamente.`; // Muestra un mensaje de éxito.
                    cancelarMensaje.style.color = 'green'; // Establece el color del mensaje a verde.
                    cancelarTurnoForm.reset(); // Reinicia el formulario.
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    cancelarMensaje.textContent = 'Error al cancelar turno: ' + errorText; // Muestra un mensaje de error.
                    cancelarMensaje.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al cancelar turno:', error); // Registra el error en la consola.
                cancelarMensaje.textContent = 'Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                cancelarMensaje.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }

    // Lógica para ver mis turnos
    const btnVerTurnos = document.getElementById('btnVerTurnos'); // Obtiene el botón para ver mis turnos.
    const listaTurnos = document.getElementById('listaTurnos'); // Obtiene la lista donde se mostrarán los turnos.
    if (btnVerTurnos) { // Verifica si el botón existe.
        btnVerTurnos.addEventListener('click', async () => { // Agrega un escuchador de eventos al botón.
            // TODO: Obtener el ID del paciente autenticado.
            const pacienteId = 1; // ID de paciente de ejemplo.

            try { // Intenta obtener los turnos del paciente.
                const response = await fetch(`/api/turnos/paciente/${pacienteId}`); // Envía una solicitud GET para obtener turnos por ID de paciente.
                if (response.ok) { // Si la respuesta es exitosa.
                    const turnos = await response.json(); // Parsea la respuesta JSON.
                    listaTurnos.innerHTML = ''; // Limpia la lista actual de turnos.
                    if (turnos.length === 0) { // Si no hay turnos agendados.
                        listaTurnos.innerHTML = '<li>No tienes turnos agendados.</li>'; // Muestra un mensaje.
                    } else { // Si hay turnos.
                        turnos.forEach(turno => { // Itera sobre cada turno.
                            const li = document.createElement('li'); // Crea un nuevo elemento de lista.
                            li.textContent = `ID: ${turno.id} - Especialidad: ${turno.especialidad} - Fecha: ${turno.fecha} - Hora: ${turno.hora} - Estado: ${turno.estado}`; // Construye el texto del elemento de lista.
                            listaTurnos.appendChild(li); // Añade el elemento a la lista.
                        });
                    }
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    listaTurnos.innerHTML = `<li style="color: red;">Error al cargar turnos: ${errorText}</li>`; // Muestra un mensaje de error.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al ver turnos:', error); // Registra el error en la consola.
                listaTurnos.innerHTML = '<li style="color: red;">Error de conexión al cargar turnos.</li>'; // Muestra un mensaje de error de conexión.
            }
        });
    }
});