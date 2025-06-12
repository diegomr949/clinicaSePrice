function gestionarVisibilidadPorRol() {
    const role = localStorage.getItem('userRole');

    if (!role) {
        // Si no hay sesión → redirige al login
        window.location.href = 'index.html';
        return;
    }

    // Mostrar los elementos que correspondan al rol
    document.querySelectorAll(`.solo-${role}`).forEach(e => e.style.display = 'block');

    // Ocultar los que NO correspondan al rol actual
    const roles = ['paciente', 'secretaria', 'medico'];
    roles.filter(r => r !== role).forEach(otroRol => {
        document.querySelectorAll(`.solo-${otroRol}`).forEach(e => e.style.display = 'none');
    });
}

// ✅ Cerrar sesión → borra credenciales y redirige al login
function cerrarSesion() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}