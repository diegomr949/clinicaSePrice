/**
 * Función para gestionar la visibilidad de los elementos HTML
 * basándose en el rol del usuario autenticado.
 * Esta función debería ser llamada al cargar las páginas de panel (paciente, secretaria, medico).
 * En una aplicación real, el rol se obtendría del backend (ej. un endpoint /api/user/role
 * o un atributo en la sesión). Para esta demostración, asume que el backend ya ha
 * redirigido a la página correcta, y los elementos se muestran/ocultan
 * si la página no coincide con el rol.
 */
function gestionarVisibilidadPorRol() { // Gestiona la visibilidad de los paneles según la URL actual.
    // Implementación de ejemplo (ajustar según cómo obtengas el rol real del usuario)
    // Se puede hacer esto en el backend para evitar que se carguen páginas incorrectas,
    // o aquí para ocultar elementos en el frontend.
    // Los div con clases como 'solo-paciente', 'solo-secretaria', 'solo-medico'
    // ya están en el HTML con display: none; y se harían visibles si el rol corresponde.

    const path = window.location.pathname; // Obtiene la ruta del archivo actual.
    const panelContainers = document.querySelectorAll('.panel-container'); // Selecciona todos los contenedores de panel.

    panelContainers.forEach(container => { // Itera sobre los contenedores para ocultarlos por defecto.
        container.style.display = 'none'; // Ocultar todos por defecto.
    });

    if (path.includes('/paciente.html')) { // Si la ruta incluye 'paciente.html'.
        const pacienteContainer = document.querySelector('.solo-paciente'); // Obtiene el contenedor del paciente.
        if (pacienteContainer) pacienteContainer.style.display = 'block'; // Muestra el contenedor del paciente.
    } else if (path.includes('/secretaria.html')) { // Si la ruta incluye 'secretaria.html'.
        const secretariaContainer = document.querySelector('.solo-secretaria'); // Obtiene el contenedor de la secretaria.
        if (secretariaContainer) secretariaContainer.style.display = 'block'; // Muestra el contenedor de la secretaria.
    } else if (path.includes('/medico.html')) { // Si la ruta incluye 'medico.html'.
        const medicoContainer = document.querySelector('.solo-medico'); // Obtiene el contenedor del médico.
        if (medicoContainer) medicoContainer.style.display = 'block'; // Muestra el contenedor del médico.
    } else { // Si no coincide con ninguna página de rol.
        // Si el usuario no tiene un rol válido para la página actual, redirigir al login.
        // Esto es una medida de seguridad extra en el frontend.
        console.warn('Acceso a página sin rol válido. Redirigiendo a login.'); // Muestra una advertencia en consola.
        // window.location.href = '/login.html'; // Descomentar si quieres una redirección forzada aquí.
    }
}


/**
 * Realiza una solicitud POST al endpoint de cierre de sesión de Spring Security.
 * Al completarse, redirige a la página de inicio de sesión.
 */
async function cerrarSesion() { // Realiza el cierre de sesión del usuario.
    try { // Intenta enviar la solicitud de logout.
        const response = await fetch('/logout', { // Envía una solicitud POST al endpoint de logout.
            method: 'POST', // Define el método HTTP como POST.
            // Si CSRF estuviera habilitado en SecurityConfig (actualmente está deshabilitado),
            // necesitarías incluir un token CSRF en los encabezados o el cuerpo de la solicitud.
            // Por ejemplo, leyendo el token de una meta etiqueta en el HTML.
            // Para el caso actual con CSRF deshabilitado, un POST simple es suficiente.
        });

        if (response.ok) { // Si la respuesta es exitosa.
            // El cierre de sesión fue exitoso en el backend.
            // Spring Security ya habrá manejado la redirección a logoutSuccessUrl.
            // Forzamos la redirección aquí para asegurar que el frontend actualice su estado visual.
            window.location.href = '/login.html?logout'; // Redirige a la página de login después del cierre de sesión.
        } else { // Si la respuesta no es exitosa.
            console.error('Error al cerrar sesión:', response.statusText); // Registra el error en la consola.
            // Mostrar un mensaje de error al usuario, sin usar alert().
            const loginMessage = document.getElementById('loginMessage') || document.createElement('div'); // Obtiene o crea un elemento para mensajes.
            loginMessage.textContent = 'Hubo un error al cerrar sesión. Intente nuevamente.'; // Muestra un mensaje de error.
            loginMessage.style.color = 'red'; // Establece el color del mensaje a rojo.
            // Si no hay un elemento con id 'loginMessage', podrías añadirlo al body o a algún contenedor.
            if (!document.getElementById('loginMessage')) { // Si el elemento de mensaje no existe.
                document.body.prepend(loginMessage); // Añade el elemento de mensaje al principio del body.
            }
        }
    } catch (error) { // Captura errores de red.
        console.error('Error de red al intentar cerrar sesión:', error); // Registra el error de red en la consola.
        // Mostrar un mensaje de error de conexión.
        const loginMessage = document.getElementById('loginMessage') || document.createElement('div'); // Obtiene o crea un elemento para mensajes.
        loginMessage.textContent = 'No se pudo conectar con el servidor para cerrar sesión.'; // Muestra un mensaje de error de conexión.
        loginMessage.style.color = 'red'; // Establece el color del mensaje a rojo.
        if (!document.getElementById('loginMessage')) { // Si el elemento de mensaje no existe.
            document.body.prepend(loginMessage); // Añade el elemento de mensaje al principio del body.
        }
    }
}