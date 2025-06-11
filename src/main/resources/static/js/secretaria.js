// Registrar Paciente
document.getElementById('registrarPacienteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombrePaciente').value;
    const dni = document.getElementById('dniPaciente').value;
    const email = document.getElementById('emailPaciente').value;
    const mensaje = document.getElementById('mensajeRegistrar');

    // Luego: Conectar con Backend (POST)
    mensaje.textContent = `✅ Paciente registrado: ${nombre} (DNI: ${dni})`;
    mensaje.style.color = 'green';
});

// Asignar Turno
document.getElementById('asignarTurnoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const dni = document.getElementById('dniTurnoPaciente').value;
    const especialidad = document.getElementById('especialidadTurno').value;
    const fecha = document.getElementById('fechaTurnoSec').value;
    const hora = document.getElementById('horaTurnoSec').value;
    const mensaje = document.getElementById('mensajeAsignar');

    // Luego: Conectar con Backend (POST)
    mensaje.textContent = `✅ Turno asignado para DNI ${dni}: ${especialidad} - ${fecha} ${hora}`;
    mensaje.style.color = 'green';
});

// Ver lista de espera (simulado)
document.getElementById('btnVerListaEspera').addEventListener('click', function () {
    const lista = document.getElementById('listaEspera');
    lista.innerHTML = '';

    // Luego: Obtener desde el Backend (GET)
    const espera = [
        { nombre: 'María López', especialidad: 'Dermatología' },
        { nombre: 'Carlos Gómez', especialidad: 'Cardiología' }
    ];

    espera.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - ${item.especialidad}`;
        lista.appendChild(li);
    });
});
