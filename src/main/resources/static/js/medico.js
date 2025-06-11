// Ver Agenda Médica
document.getElementById('btnVerAgenda').addEventListener('click', function () {
    const lista = document.getElementById('listaAgenda');
    lista.innerHTML = '';

    // ⚠️ Esto luego se reemplaza por fetch() al Backend (GET)
    const agenda = [
        { id: 1, paciente: 'Laura Fernández', fecha: '2025-06-10', hora: '10:00' },
        { id: 2, paciente: 'Miguel Pérez', fecha: '2025-06-10', hora: '11:00' }
    ];

    agenda.forEach(turno => {
        const li = document.createElement('li');
        li.textContent = `ID: ${turno.id} | ${turno.paciente} - ${turno.fecha} ${turno.hora}`;
        lista.appendChild(li);
    });
});

// Registrar Atención Médica
document.getElementById('atencionMedicaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const turnoId = document.getElementById('turnoIdAtender').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const mensaje = document.getElementById('mensajeAtencion');

    // ⚠️ Esto luego se reemplaza por fetch() al Backend (POST)
    mensaje.textContent = `✅ Atención registrada para Turno ID ${turnoId}`;
    mensaje.style.color = 'green';
});
