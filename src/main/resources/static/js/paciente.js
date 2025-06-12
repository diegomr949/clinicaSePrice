const pacienteId = 1; // ⚠ Provisorio → luego este dato debe venir del backend

function getAuthHeader() {
    return { 'Authorization': `Basic ${localStorage.getItem('auth')}` };
}

// Solicitar Turno
document.getElementById('solicitarTurnoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fechaTurno').value;
    const hora = document.getElementById('horaTurno').value;
    const mensaje = document.getElementById('solicitarMensaje');

    try {
        const response = await fetch('http://localhost:8080/api/turnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                paciente: { id: pacienteId },
                especialidad,
                fecha,
                hora
            })
        });

        if (response.ok) {
            const turnoCreado = await response.json();
            mensaje.textContent = `✅ Turno solicitado (ID: ${turnoCreado.id}) para ${especialidad} - ${fecha} ${hora}`;
            mensaje.style.color = 'green';
            document.getElementById('solicitarTurnoForm').reset();
        } else {
            mensaje.textContent = `❌ Error al solicitar turno`;
            mensaje.style.color = 'red';
        }
    } catch {
        mensaje.textContent = '❌ Error de conexión con el servidor';
        mensaje.style.color = 'red';
    }
});

// Cancelar Turno
document.getElementById('cancelarTurnoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const turnoId = document.getElementById('turnoIdCancelar').value;
    const mensaje = document.getElementById('cancelarMensaje');

    try {
        const response = await fetch(`http://localhost:8080/api/turnos/${turnoId}/cancelar`, {
            method: 'PUT',
            headers: getAuthHeader()
        });

        if (response.ok) {
            mensaje.textContent = `✅ Turno ${turnoId} cancelado correctamente`;
            mensaje.style.color = 'green';
            document.getElementById('cancelarTurnoForm').reset();
        } else {
            mensaje.textContent = `❌ Error al cancelar turno`;
            mensaje.style.color = 'red';
        }
    } catch {
        mensaje.textContent = `❌ Error de conexión con el servidor`;
        mensaje.style.color = 'red';
    }
});

// Ver Mis Turnos
document.getElementById('btnVerTurnos').addEventListener('click', async function () {
    const lista = document.getElementById('listaTurnos');
    lista.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:8080/api/turnos/paciente/${pacienteId}`, {
            headers: getAuthHeader()
        });

        if (response.ok) {
            const turnos = await response.json();
            if (turnos.length === 0) {
                lista.innerHTML = '<li>No tenés turnos cargados.</li>';
                return;
            }
            turnos.forEach(turno => {
                const li = document.createElement('li');
                li.textContent = `ID: ${turno.id} | ${turno.especialidad} - ${turno.fecha} ${turno.hora} | Estado: ${turno.estado}`;
                lista.appendChild(li);
            });
        } else {
            lista.innerHTML = `<li>❌ Error al obtener turnos</li>`;
        }
    } catch {
        lista.innerHTML = `<li>❌ Error de conexión con el servidor</li>`;
    }
});
