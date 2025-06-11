document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('userRole').value;
    const message = document.getElementById('loginMessage');

    if (username === '' || password === '' || role === '') {
        message.textContent = 'Completa todos los campos.';
        return;
    }

    // ⚠️ Esto después se reemplazará con validación contra el Backend (Spring Security o JWT)
    if (role === 'paciente') {
        window.location.href = 'paciente.html';
    } else if (role === 'secretaria') {
        window.location.href = 'secretaria.html';
    } else if (role === 'medico') {
        window.location.href = 'medico.html';
    } else {
        message.textContent = 'Perfil inválido.';
    }
});
