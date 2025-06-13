// js/registroPaciente.js - Registro de nuevos pacientes con manejo de DNI duplicado

document.addEventListener('DOMContentLoaded', () => {
    const registroPacienteForm = document.getElementById('registroPacienteForm');
    const registroMensaje = document.getElementById('registroMensaje');

    if (registroPacienteForm) {
        registroPacienteForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombrePaciente').value.trim();
            const dni = document.getElementById('dniPaciente').value.trim();
            const email = document.getElementById('emailPaciente').value.trim();

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
                    credentials: 'include', // ✅ IMPORTANTE → envía cookies con sesión iniciada
                    body: JSON.stringify(pacienteData)
                });
                if (response.ok) {
                    const paciente = await response.json();
                    registroMensaje.textContent = `✅ Paciente ${paciente.nombre} registrado exitosamente (ID: ${paciente.id})`;
                    registroMensaje.style.color = 'green';
                    registroPacienteForm.reset();
                } else {
                    const errorText = await response.text();
                    registroMensaje.textContent = errorText.includes('Ya existe un paciente registrado')
                        ? '❌ ' + errorText
                        : '❌ Error al registrar paciente: ' + errorText;
                    registroMensaje.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red al registrar paciente:', error);
                registroMensaje.textContent = '❌ Error de conexión. Intente nuevamente.';
                registroMensaje.style.color = 'red';
            }
        });
    }
});
