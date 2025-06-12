function getAuthHeader() {
    return { 'Authorization': `Basic ${localStorage.getItem('auth')}` };
}

document.getElementById('atencionMedicaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const turnoId = document.getElementById('turnoIdAtender').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const mensaje = document.getElementById('mensajeAtencion');

    const atencionDTO = {
        turnoId: parseInt(turnoId),
        diagnostico: diagnostico
    };

    fetch('http://localhost:8080/api/atenciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(atencionDTO)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || 'Error al registrar la atención'); });
            }
            return response.json();
        })
        .then(data => {
            mensaje.textContent = `✅ Atención registrada correctamente (ID Atención ${data.id})`;
            mensaje.style.color = 'green';
            document.getElementById('atencionMedicaForm').reset();
        })
        .catch(error => {
            mensaje.textContent = `❌ ${error.message}`;
            mensaje.style.color = 'red';
        });
});

document.getElementById('btnVerAgenda').addEventListener('click', function () {
    fetch('http://localhost:8080/api/atenciones', {
        headers: getAuthHeader()
    })
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('listaAgenda');
            lista.innerHTML = '';
            if (data.length === 0) {
                lista.innerHTML = '<li>No hay atenciones registradas.</li>';
                return;
            }
            data.forEach(atencion => {
                const li = document.createElement('li');
                li.textContent = `ID: ${atencion.id} - Diagnóstico: ${atencion.diagnostico} - Fecha: ${atencion.fechaAtencion} - Turno ID: ${atencion.turno.id}`;
                lista.appendChild(li);
            });
        })
        .catch(error => {
            alert('Error al cargar la agenda: ' + error.message);
        });
});
