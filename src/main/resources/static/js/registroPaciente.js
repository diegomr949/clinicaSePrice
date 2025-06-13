document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado.
    const registroPacienteForm = document.getElementById('registroPacienteForm'); // Obtiene el formulario de registro de paciente.
    const registroMensaje = document.getElementById('registroMensaje'); // Obtiene el elemento para mostrar mensajes de registro.

    if (registroPacienteForm) { // Verifica si el formulario de registro existe.
        registroPacienteForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos para el envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.

            const nombre = document.getElementById('nombrePaciente').value.trim(); // Obtiene y recorta el nombre del paciente.
            const dni = document.getElementById('dniPaciente').value.trim(); // Obtiene y recorta el DNI del paciente.
            const email = document.getElementById('emailPaciente').value.trim(); // Obtiene y recorta el email del paciente.

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
                    credentials: 'include', // Incluye cookies en la solicitud para mantener la sesión.
                    body: JSON.stringify(pacienteData) // Convierte los datos del paciente a JSON.
                });
                if (response.ok) { // Si la respuesta es exitosa.
                    const paciente = await response.json(); // Parsea la respuesta JSON.
                    registroMensaje.textContent = `✅ Paciente ${paciente.nombre} registrado exitosamente (ID: ${paciente.id})`; // Muestra un mensaje de éxito.
                    registroMensaje.style.color = 'green'; // Establece el color del mensaje a verde.
                    registroPacienteForm.reset(); // Reinicia el formulario.
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    registroMensaje.textContent = errorText.includes('Ya existe un paciente registrado') // Verifica si el error es por DNI duplicado.
                        ? '❌ ' + errorText // Muestra el mensaje de error de DNI duplicado.
                        : '❌ Error al registrar paciente: ' + errorText; // Muestra un mensaje de error general.
                    registroMensaje.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red.
                console.error('Error de red al registrar paciente:', error); // Registra el error en la consola.
                registroMensaje.textContent = '❌ Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                registroMensaje.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }
});