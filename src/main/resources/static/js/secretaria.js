function getAuthHeader() {
    return { 'Authorization': `Basic ${localStorage.getItem('auth')}` };
}

// Registrar Paciente
document.getElementById('registrarPacienteForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombrePaciente').value;
    const dni = document.getElementById('dniPaciente').value;
    const email = document.getElementById('emailPaciente').value;
    const mensaje = document.getElementById('mensajeRegistrar');

    try {
        const response = await fetch('http://localhost:8080/api/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({ nombre, dni, email })
        });

        if (response.ok) {
            const paciente = await response.json();
            mensaje.textContent = `✅ Paciente registrado: ${paciente.nombre} (ID: ${paciente.id})`;
            mensaje.style.color = 'green';
            document.getElementById('registrarPacienteForm').reset();
        } else {
            const error = await response.text();
            mensaje.textContent = `❌ Error: ${error}`;
            mensaje.style.color = 'red';
        }
    } catch {
        mensaje.textContent = '❌ Error de conexión con el servidor';
        mensaje.style.color = 'red';
    }
});

// Asignar Turno
document.getElementById('asignarTurnoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const dni = document.getElementById('dniTurnoPaciente').value;
    const especialidad = document.getElementById('especialidadTurno').value;
    const fecha = document.getElementById('fechaTurnoSec').value;
    const hora = document.getElementById('horaTurnoSec').value;
    const mensaje = document.getElementById('mensajeAsignar');

    try {
        const pacientesResp = await fetch('http://localhost:8080/api/pacientes', {
            headers: getAuthHeader()
        });
        const pacientes = await pacientesResp.json();
        const paciente = pacientes.find(p => p.dni === dni);

        if (!paciente) {
            mensaje.textContent = `❌ No se encontró paciente con DNI ${dni}`;
            mensaje.style.color = 'red';
            return;
        }

        const turnoResp = await fetch('http://localhost:8080/api/turnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                paciente: { id: paciente.id },
                especialidad,
                fecha,
                hora
            })
        });

        if (turnoResp.ok) {
            const turno = await turnoResp.json();
            mensaje.textContent = `✅ Turno asignado para ${paciente.nombre}: ${especialidad} - ${fecha} ${hora} (ID: ${turno.id})`;
            mensaje.style.color = 'green';
            document.getElementById('asignarTurnoForm').reset();
        } else {
            mensaje.textContent = `❌ Error al asignar turno`;
            mensaje.style.color = 'red';
        }
    } catch {
        mensaje.textContent = `❌ Error de conexión con el servidor`;
        mensaje.style.color = 'red';
    }
});
