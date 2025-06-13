// js/roles.js - Funciones comunes relacionadas con roles y cierre de sesión

/**
 * Función para gestionar la visibilidad de los elementos HTML
 * basándose en el rol del usuario autenticado.
 * Esta función debería ser llamada al cargar las páginas de panel (paciente, secretaria, medico).
 * En una aplicación real, el rol se obtendría del backend (ej. un endpoint /api/user/role
 * o un atributo en la sesión). Para esta demostración, asume que el backend ya ha
 * redirigido a la página correcta, y los elementos se muestran/ocultan
 * si la página no coincide con el rol.
 */
function gestionarVisibilidadPorRol() {
    // Implementación de ejemplo (ajustar según cómo obtengas el rol real del usuario)
    // Se puede hacer esto en el backend para evitar que se carguen páginas incorrectas,
    // o aquí para ocultar elementos en el frontend.
    // Los div con clases como 'solo-paciente', 'solo-secretaria', 'solo-medico'
    // ya están en el HTML con display: none; y se harían visibles si el rol corresponde.

    const path = window.location.pathname;
    const panelContainers = document.querySelectorAll('.panel-container');

    panelContainers.forEach(container => {
        container.style.display = 'none'; // Ocultar todos por defecto
    });

    if (path.includes('/paciente.html')) {
        const pacienteContainer = document.querySelector('.solo-paciente');
        if (pacienteContainer) pacienteContainer.style.display = 'block';
    } else if (path.includes('/secretaria.html')) {
        const secretariaContainer = document.querySelector('.solo-secretaria');
        if (secretariaContainer) secretariaContainer.style.display = 'block';
    } else if (path.includes('/medico.html')) {
        const medicoContainer = document.querySelector('.solo-medico');
        if (medicoContainer) medicoContainer.style.display = 'block';
    } else {
        // Si el usuario no tiene un rol válido para la página actual, redirigir al login.
        // Esto es una medida de seguridad extra en el frontend.
        console.warn('Acceso a página sin rol válido. Redirigiendo a login.');
        // window.location.href = '/login.html'; // Descomentar si quieres una redirección forzada aquí
    }
}


/**
 * Realiza una solicitud POST al endpoint de cierre de sesión de Spring Security.
 * Al completarse, redirige a la página de inicio de sesión.
 */
async function cerrarSesion() {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            // Si CSRF estuviera habilitado en SecurityConfig (actualmente está deshabilitado),
            // necesitarías incluir un token CSRF en los encabezados o el cuerpo de la solicitud.
            // Por ejemplo, leyendo el token de una meta etiqueta en el HTML.
            // Para el caso actual con CSRF deshabilitado, un POST simple es suficiente.
        });

        if (response.ok) {
            // El cierre de sesión fue exitoso en el backend.
            // Spring Security ya habrá manejado la redirección a logoutSuccessUrl.
            // Forzamos la redirección aquí para asegurar que el frontend actualice su estado visual.
            window.location.href = '/login.html?logout'; // Coincide con logoutSuccessUrl en SecurityConfig
        } else {
            console.error('Error al cerrar sesión:', response.statusText);
            // Mostrar un mensaje de error al usuario, sin usar alert()
            const loginMessage = document.getElementById('loginMessage') || document.createElement('div');
            loginMessage.textContent = 'Hubo un error al cerrar sesión. Intente nuevamente.';
            loginMessage.style.color = 'red';
            // Si no hay un elemento con id 'loginMessage', podrías añadirlo al body o a algún contenedor.
            if (!document.getElementById('loginMessage')) {
                document.body.prepend(loginMessage);
            }
        }
    } catch (error) {
        console.error('Error de red al intentar cerrar sesión:', error);
        // Mostrar un mensaje de error de conexión
        const loginMessage = document.getElementById('loginMessage') || document.createElement('div');
        loginMessage.textContent = 'No se pudo conectar con el servidor para cerrar sesión.';
        loginMessage.style.color = 'red';
        if (!document.getElementById('loginMessage')) {
            document.body.prepend(loginMessage);
        }
    }
}