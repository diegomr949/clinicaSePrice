document.getElementById('solicitarTurnoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fechaTurno').value;
    const hora = document.getElementById('horaTurno').value;
    const mensaje = document.getElementById('solicitarMensaje');

    const pacienteId = 1; // 🔔 Provisorio hasta que implementes login y obtengas el ID real del paciente

    try {
        const response = await fetch('http://localhost:8080/api/turnos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paciente: { id: pacienteId }, // 📌 Relación con el paciente
                especialidad: especialidad,
                fecha: fecha,
                hora: hora
            })
        });

        if (response.ok) {
            const turnoCreado = await response.json();
            mensaje.textContent = `✅ Turno solicitado (ID: ${turnoCreado.id}) para ${especialidad} - ${fecha} ${hora}`;
            mensaje.style.color = 'green';
        } else {
            const error = await response.text();
            mensaje.textContent = `❌ Error al solicitar turno: ${error}`;
            mensaje.style.color = 'red';
        }
    } catch (err) {
        mensaje.textContent = `❌ Error de conexión con el servidor`;
        mensaje.style.color = 'red';
    }
});

document.getElementById('cancelarTurnoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const turnoId = document.getElementById('turnoIdCancelar').value;
    const mensaje = document.getElementById('cancelarMensaje');

    try {
        const response = await fetch(`http://localhost:8080/api/turnos/${turnoId}/cancelar`, {
            method: 'PUT'
        });

        if (response.ok) {
            mensaje.textContent = `❌ Turno ${turnoId} cancelado correctamente`;
            mensaje.style.color = 'green';
        } else {
            const error = await response.text();
            mensaje.textContent = `❌ Error al cancelar turno: ${error}`;
            mensaje.style.color = 'red';
        }
    } catch (err) {
        mensaje.textContent = `❌ Error de conexión con el servidor`;
        mensaje.style.color = 'red';
    }
});

document.getElementById('btnVerTurnos').addEventListener('click', async function () {
    const lista = document.getElementById('listaTurnos');
    lista.innerHTML = '';

    try {
        const response = await fetch('http://localhost:8080/api/turnos');
        if (response.ok) {
            const turnos = await response.json();
            turnos.forEach(turno => {
                const li = document.createElement('li');
                li.textContent = `ID: ${turno.id} | ${turno.especialidad} - ${turno.fecha} ${turno.hora} | Estado: ${turno.estado}`;
                lista.appendChild(li);
            });
        } else {
            lista.innerHTML = `<li>❌ Error al obtener turnos</li>`;
        }
    } catch (err) {
        lista.innerHTML = `<li>❌ Error de conexión con el servidor</li>`;
    }
});
