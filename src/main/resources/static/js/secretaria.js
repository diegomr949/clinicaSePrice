document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado.
    // Lógica para registrar paciente
    const registrarPacienteForm = document.getElementById('registrarPacienteForm'); // Obtiene el formulario de registro de paciente.
    const mensajeRegistrar = document.getElementById('mensajeRegistrar'); // Obtiene el elemento para mensajes de registro.
    if (registrarPacienteForm) { // Verifica si el formulario de registro existe.
        registrarPacienteForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos para el envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.
            const nombre = document.getElementById('nombrePaciente').value; // Obtiene el valor del campo de nombre.
            const dni = document.getElementById('dniPaciente').value; // Obtiene el valor del campo de DNI.
            const email = document.getElementById('emailPaciente').value; // Obtiene el valor del campo de email.

            const pacienteData = { // Crea el objeto de datos del paciente.
                nombre: nombre, // Asigna el nombre.
                dni: dni, // Asigna el DNI.
                email: email // Asigna el email.
            };

            try { // Intenta enviar la solicitud de registro.
                const response = await fetch('/api/pacientes', { // Envía una solicitud POST a la API de pacientes.
                    method: 'POST', // Define el método HTTP como POST.
                    headers: {
                        'Content-Type': 'application/json' // Establece el tipo de contenido del cuerpo.
                    },
                    body: JSON.stringify(pacienteData) // Convierte los datos a JSON.
                });

                if (response.ok) { // Si la respuesta es exitosa.
                    const paciente = await response.json(); // Parsea la respuesta JSON.
                    mensajeRegistrar.textContent = `Paciente ${paciente.nombre} registrado exitosamente. ID: ${paciente.id}`; // Muestra un mensaje de éxito.
                    mensajeRegistrar.style.color = 'green'; // Establece el color del mensaje a verde.
                    registrarPacienteForm.reset(); // Reinicia el formulario.
                } else { // Si la respuesta no es exitosa.
                    // Si la respuesta no es OK, intenta leer el error
                    const errorResponse = await response.json(); // Asume que el backend envía JSON para errores.
                    if (errorResponse && errorResponse.message) { // Si hay un mensaje de error en la respuesta.
                        mensajeRegistrar.textContent = 'Error al registrar paciente: ' + errorResponse.message; // Muestra el mensaje de error específico.
                    } else { // Si no hay un mensaje de error específico.
                        mensajeRegistrar.textContent = 'Error al registrar paciente. Por favor, intente de nuevo.'; // Muestra un mensaje de error genérico.
                    }
                    mensajeRegistrar.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al registrar paciente:', error); // Registra el error en la consola.
                mensajeRegistrar.textContent = 'Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                mensajeRegistrar.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }

    // Lógica para asignar turno
    const asignarTurnoForm = document.getElementById('asignarTurnoForm'); // Obtiene el formulario para asignar turno.
    const mensajeAsignar = document.getElementById('mensajeAsignar'); // Obtiene el elemento para mensajes de asignación.
    if (asignarTurnoForm) { // Verifica si el formulario de asignación de turno existe.
        asignarTurnoForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos para el envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.
            const dniPaciente = document.getElementById('dniTurnoPaciente').value; // Obtiene el DNI del paciente para el turno.
            const especialidad = document.getElementById('especialidadTurno').value; // Obtiene la especialidad del turno.
            const fecha = document.getElementById('fechaTurnoSec').value; // Obtiene la fecha del turno.
            const hora = document.getElementById('horaTurnoSec').value; // Obtiene la hora del turno.

            // TODO: Buscar paciente por DNI para obtener su ID antes de asignar el turno
            // Por simplicidad, se asume un ID de paciente ficticio.
            // En una aplicación real, harías una llamada a /api/pacientes?dni=...
            const pacienteId = 1; // ID de paciente de ejemplo.

            const turnoData = { // Crea el objeto de datos del turno.
                pacienteId: pacienteId, // Asigna el ID del paciente.
                especialidad: especialidad, // Asigna la especialidad.
                fecha: fecha, // Asigna la fecha.
                hora: hora, // Asigna la hora.
                // Se cambió el estado de "CONFIRMADO" a "ASIGNADO"
                // para que coincida con los valores aceptados por el enum EstadoTurno del backend.
                estado: "ASIGNADO" // Asigna el estado del turno.
            };

            try { // Intenta enviar la solicitud de asignación de turno.
                const response = await fetch('/api/turnos', { // Envía una solicitud POST a la API de turnos.
                    method: 'POST', // Define el método HTTP como POST.
                    headers: {
                        'Content-Type': 'application/json' // Establece el tipo de contenido.
                    },
                    body: JSON.stringify(turnoData) // Convierte los datos a JSON.
                });

                if (response.ok) { // Si la respuesta es exitosa.
                    const turno = await response.json(); // Parsea la respuesta JSON.
                    mensajeAsignar.textContent = `Turno asignado exitosamente. ID: ${turno.id}`; // Muestra un mensaje de éxito.
                    mensajeAsignar.style.color = 'green'; // Establece el color del mensaje a verde.
                    asignarTurnoForm.reset(); // Reinicia el formulario.
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    mensajeAsignar.textContent = 'Error al asignar turno: ' + errorText; // Muestra un mensaje de error.
                    mensajeAsignar.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al asignar turno:', error); // Registra el error en la consola.
                mensajeAsignar.textContent = 'Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                mensajeAsignar.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }

    // Lógica para ver lista de espera (simulada)
    const btnVerListaEspera = document.getElementById('btnVerListaEspera'); // Obtiene el botón para ver la lista de espera.
    const listaEspera = document.getElementById('listaEspera'); // Obtiene la lista donde se mostrará la lista de espera.
    if (btnVerListaEspera) { // Verifica si el botón existe.
        btnVerListaEspera.addEventListener('click', async () => { // Agrega un escuchador de eventos al botón.
            // En una aplicación real, aquí harías una llamada para obtener turnos pendientes
            try { // Intenta obtener los turnos.
                const response = await fetch('/api/turnos'); // Obtiene todos los turnos.
                if (response.ok) { // Si la respuesta es exitosa.
                    const turnos = await response.json(); // Parsea la respuesta JSON.
                    // Filtrar turnos con estado "PENDIENTE" para la "lista de espera"
                    const turnosPendientes = turnos.filter(turno => turno.estado === "PENDIENTE"); // Filtra los turnos con estado "PENDIENTE".

                    listaEspera.innerHTML = ''; // Limpia la lista actual.
                    if (turnosPendientes.length === 0) { // Si no hay turnos pendientes.
                        listaEspera.innerHTML = '<li>No hay turnos en lista de espera.</li>'; // Muestra un mensaje.
                    } else { // Si hay turnos pendientes.
                        turnosPendientes.forEach(turno => { // Itera sobre cada turno pendiente.
                            const li = document.createElement('li'); // Crea un nuevo elemento de lista.
                            li.textContent = `ID: ${turno.id} - Paciente ID: ${turno.paciente.id} - Especialidad: ${turno.especialidad} - Fecha: ${turno.fecha} - Hora: ${turno.hora}`; // Construye el texto del elemento de lista.
                            listaEspera.appendChild(li); // Añade el elemento a la lista.
                        });
                    }
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    listaEspera.innerHTML = `<li style="color: red;">Error al cargar lista de espera: ${errorText}</li>`; // Muestra un mensaje de error.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al cargar lista de espera:', error); // Registra el error en la consola.
                listaEspera.innerHTML = '<li style="color: red;">Error de conexión al cargar lista de espera.</li>'; // Muestra un mensaje de error de conexión.
            }
        });
    }
});