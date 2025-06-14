document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado.
    // Lógica para ver la agenda médica
    const btnVerAgenda = document.getElementById('btnVerAgenda'); // Obtiene el botón para ver la agenda.
    const listaAgenda = document.getElementById('listaAgenda'); // Obtiene la lista donde se mostrará la agenda.
    if (btnVerAgenda) { // Verifica si el botón existe.
        btnVerAgenda.addEventListener('click', async () => { // Agrega un escuchador de eventos al botón.
            try { // Intenta obtener los turnos.
                const response = await fetch('/api/turnos'); // Envía una solicitud GET para obtener todos los turnos.
                if (response.ok) { // Si la respuesta es exitosa.
                    const turnos = await response.json(); // Parsea la respuesta JSON.

                    // Obtener la fecha actual en formato YYYY-MM-DD
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses 0-11
                    const day = String(today.getDate()).padStart(2, '0');
                    const todayFormatted = `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"

                    // Filtrar turnos con estado "ASIGNADO" y que sean para el día de hoy
                    const turnosHoyAsignados = turnos.filter(turno =>
                        turno.estado === 'ASIGNADO' && turno.fecha === todayFormatted // Filtra por estado y fecha actual.
                    );

                    listaAgenda.innerHTML = ''; // Limpia la lista actual de la agenda.
                    if (turnosHoyAsignados.length === 0) { // Si no hay turnos asignados para hoy.
                        listaAgenda.innerHTML = '<li>No hay turnos asignados para el día de hoy.</li>'; // Muestra un mensaje.
                    } else { // Si hay turnos asignados para hoy.
                        turnosHoyAsignados.forEach(turno => { // Itera sobre cada turno asignado de hoy.
                            const li = document.createElement('li'); // Crea un nuevo elemento de lista.
                            // Construye el texto del elemento de lista, mostrando el nombre del paciente
                            li.textContent = `ID: ${turno.id} - Paciente: ${turno.paciente.nombre} - Especialidad: ${turno.especialidad} - Hora: ${turno.hora} - Estado: ${turno.estado}`;
                            listaAgenda.appendChild(li); // Añade el elemento a la lista.
                        });
                    }
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto del error.
                    listaAgenda.innerHTML = `<li style="color: red;">Error al cargar agenda: ${errorText}</li>`; // Muestra un mensaje de error.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al ver agenda:', error); // Registra el error en la consola.
                listaAgenda.innerHTML = '<li style="color: red;">Error de conexión al cargar agenda.</li>'; // Muestra un mensaje de error de conexión.
            }
        });
    }

    // Lógica para registrar atención médica
    const atencionMedicaForm = document.getElementById('atencionMedicaForm'); // Obtiene el formulario de atención médica.
    const mensajeAtencion = document.getElementById('mensajeAtencion'); // Obtiene el elemento para mensajes de atención.
    if (atencionMedicaForm) { // Verifica si el formulario existe.
        atencionMedicaForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos al envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.
            const turnoId = document.getElementById('turnoIdAtender').value; // Obtiene el ID del turno a atender.
            const diagnostico = document.getElementById('diagnostico').value; // Obtiene el diagnóstico.

            const atencionData = { // Crea el objeto de datos para la atención.
                turnoId: parseInt(turnoId), // Convierte el ID del turno a número entero.
                diagnostico: diagnostico // Asigna el diagnóstico.
            };

            try { // Intenta registrar la atención.
                const response = await fetch('/api/atenciones', { // Envía una solicitud POST a la API de atenciones.
                    method: 'POST', // Define el método HTTP como POST.
                    headers: {
                        'Content-Type': 'application/json' // Establece el tipo de contenido.
                    },
                    body: JSON.stringify(atencionData) // Convierte los datos a JSON.
                });

                if (response.ok) { // Si la respuesta es exitosa.
                    const atencion = await response.json(); // Parsea la respuesta JSON.
                    mensajeAtencion.textContent = `Atención registrada para el turno ID ${atencion.turno.id}.`; // Muestra un mensaje de éxito.
                    mensajeAtencion.style.color = 'green'; // Establece el color del mensaje a verde.
                    atencionMedicaForm.reset(); // Reinicia el formulario.
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto del error.
                    mensajeAtencion.textContent = 'Error al registrar atención: ' + errorText; // Muestra un mensaje de error.
                    mensajeAtencion.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al registrar atención:', error); // Registra el error en la consola.
                mensajeAtencion.textContent = 'Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                mensajeAtencion.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }
});
