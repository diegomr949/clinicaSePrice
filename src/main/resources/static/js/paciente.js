document.getElementById('solicitarTurnoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fechaTurno').value;
    const hora = document.getElementById('horaTurno').value;
    const mensaje = document.getElementById('solicitarMensaje');

    // Aquí luego se conectará con el Backend (POST)
    mensaje.textContent = `✅ Turno solicitado: ${especialidad} - ${fecha} ${hora}`;
    mensaje.style.color = 'green';
});

document.getElementById('cancelarTurnoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const turnoId = document.getElementById('turnoIdCancelar').value;
    const mensaje = document.getElementById('cancelarMensaje');

    // Aquí luego se conectará con el Backend (DELETE)
    mensaje.textContent = `❌ Turno ${turnoId} cancelado`;
    mensaje.style.color = 'green';
});

document.getElementById('btnVerTurnos').addEventListener('click', function () {
    const lista = document.getElementById('listaTurnos');
    lista.innerHTML = '';

    // Simulación de turnos - Esto luego se reemplaza por fetch() al Backend
    const turnos = [
        { id: 1, especialidad: 'Cardiología', fecha: '2025-06-10', hora: '10:00' },
        { id: 2, especialidad: 'Pediatría', fecha: '2025-06-12', hora: '14:00' }
    ];

    turnos.forEach(turno => {
        const li = document.createElement('li');
        li.textContent = `ID: ${turno.id} | ${turno.especialidad} - ${turno.fecha} ${turno.hora}`;
        lista.appendChild(li);
    });
});
