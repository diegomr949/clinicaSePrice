document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('userRole').value;
    const message = document.getElementById('loginMessage');

    if (username === '' || password === '' || role === '') {
        message.textContent = 'Completa todos los campos.';
        message.style.color = 'red';
        return;
    }

    const credentials = btoa(`${username}:${password}`); // codifica en Base64 usuario:contraseña

    try {
        // Hacemos una solicitud protegida al backend como prueba
        const response = await fetch('http://localhost:8080/api/turnos', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        if (response.ok) {
            // Guardar credenciales codificadas para usarlas en futuras peticiones
            localStorage.setItem('auth', credentials);
            localStorage.setItem('userRole', role);

            // Redirigir al panel correspondiente
            if (role === 'paciente') {
                window.location.href = 'paciente.html';
            } else if (role === 'secretaria') {
                window.location.href = 'secretaria.html';
            } else if (role === 'medico') {
                window.location.href = 'medico.html';
            } else {
                message.textContent = 'Perfil inválido.';
                message.style.color = 'red';
            }
        } else {
            message.textContent = '❌ Usuario o contraseña incorrectos';
            message.style.color = 'red';
        }
    } catch (err) {
        message.textContent = '❌ Error de conexión con el servidor';
        message.style.color = 'red';
    }
});
