document.getElementById('registroPacienteForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombrePaciente').value;
    const dni = document.getElementById('dniPaciente').value;
    const email = document.getElementById('emailPaciente').value;
    const mensaje = document.getElementById('registroMensaje');

    try {
        const response = await fetch('http://localhost:8080/api/pacientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, dni, email })
        });

        if (response.ok) {
            const paciente = await response.json();
            mensaje.textContent = `✅ Paciente registrado: ${paciente.nombre} (ID: ${paciente.id})`;
            mensaje.style.color = 'green';
            document.getElementById('registroPacienteForm').reset();
        } else {
            const error = await response.text();
            mensaje.textContent = `❌ Error: ${error}`;
            mensaje.style.color = 'red';
        }
    } catch (err) {
        mensaje.textContent = '❌ Error de conexión con el servidor';
        mensaje.style.color = 'red';
    }
});
