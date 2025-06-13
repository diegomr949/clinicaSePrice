document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado.
    const loginForm = document.getElementById('loginForm'); // Obtiene el formulario de login.
    const loginMessage = document.getElementById('loginMessage'); // Obtiene el elemento para mensajes de login.

    if (loginForm) { // Verifica si el formulario de login existe.
        loginForm.addEventListener('submit', async (event) => { // Agrega un escuchador de eventos para el envío del formulario.
            event.preventDefault(); // Previene el envío por defecto del formulario.

            const username = document.getElementById('username').value; // Obtiene el valor del campo de usuario.
            const password = document.getElementById('password').value; // Obtiene el valor del campo de contraseña.
            const userRole = document.getElementById('userRole').value; // Obtiene el rol seleccionado (aunque no se usa directamente aquí).

            // Spring Security espera 'username' y 'password' en el cuerpo de la solicitud POST
            // No necesita el rol aquí, ya que Spring Security lo manejará internamente.
            // El customAuthenticationSuccessHandler se encargará de la redirección basada en el rol.
            const formData = new URLSearchParams(); // Crea un objeto URLSearchParams para los datos del formulario.
            formData.append('username', username); // Añade el nombre de usuario a los datos del formulario.
            formData.append('password', password); // Añade la contraseña a los datos del formulario.

            try { // Intenta enviar la solicitud de login.
                const response = await fetch('/login', { // Envía una solicitud POST a la URL de login de Spring Security.
                    method: 'POST', // Define el método HTTP como POST.
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // Establece el tipo de contenido del cuerpo.
                    },
                    body: formData.toString() // Convierte los datos del formulario a una cadena.
                });

                if (response.ok) { // Verifica si la respuesta HTTP es exitosa (estado 2xx).
                    // Spring Security ya habrá manejado la redirección exitosa.
                    // No es necesario hacer un window.location.href aquí si successHandler está configurado.
                    // Si llega aquí, significa que la redirección automática falló o no se configuró correctamente.
                    // En ese caso, se podría forzar una redirección:
                    // window.location.href = '/some-default-page.html';
                } else { // Si la respuesta no es exitosa.
                    const errorText = await response.text(); // Obtiene el texto de error de la respuesta.
                    loginMessage.textContent = 'Error de inicio de sesión: ' + errorText; // Muestra el mensaje de error.
                    loginMessage.style.color = 'red'; // Establece el color del mensaje a rojo.
                }
            } catch (error) { // Captura errores de red durante el inicio de sesión.
                console.error('Error de red durante el inicio de sesión:', error); // Registra el error en la consola.
                loginMessage.textContent = 'Error de conexión. Intente nuevamente.'; // Muestra un mensaje de error de conexión.
                loginMessage.style.color = 'red'; // Establece el color del mensaje a rojo.
            }
        });
    }

    // Comprobar si hay un parámetro 'logout' en la URL después de cerrar sesión
    const urlParams = new URLSearchParams(window.location.search); // Crea un objeto URLSearchParams de la URL actual.
    if (urlParams.has('logout')) { // Verifica si la URL contiene el parámetro 'logout'.
        loginMessage.textContent = 'Sesión cerrada exitosamente.'; // Muestra un mensaje de éxito de cierre de sesión.
        loginMessage.style.color = 'green'; // Establece el color del mensaje a verde.
        history.replaceState({}, document.title, window.location.pathname); // Elimina el parámetro 'logout' de la URL.
    }
});
