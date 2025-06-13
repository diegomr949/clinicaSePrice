document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userRole = document.getElementById('userRole').value; // Obtener el rol seleccionado

            // Spring Security espera 'username' y 'password' en el cuerpo de la solicitud POST
            // No necesita el rol aquí, ya que Spring Security lo manejará internamente.
            // El customAuthenticationSuccessHandler se encargará de la redirección basada en el rol.
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            try {
                const response = await fetch('/login', { // La URL de login de Spring Security
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });

                if (response.ok) {
                    // Spring Security ya habrá manejado la redirección exitosa.
                    // No es necesario hacer un window.location.href aquí si successHandler está configurado.
                    // Si llega aquí, significa que la redirección automática falló o no se configuró correctamente.
                    // En ese caso, se podría forzar una redirección:
                    // window.location.href = '/some-default-page.html';
                } else {
                    const errorText = await response.text(); // O response.json() si el backend envía JSON de error
                    loginMessage.textContent = 'Error de inicio de sesión: ' + errorText;
                    loginMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error de red durante el inicio de sesión:', error);
                loginMessage.textContent = 'Error de conexión. Intente nuevamente.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Comprobar si hay un parámetro 'logout' en la URL después de cerrar sesión
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('logout')) {
        loginMessage.textContent = 'Sesión cerrada exitosamente.';
        loginMessage.style.color = 'green';
        // Eliminar el parámetro 'logout' de la URL para que no se muestre continuamente
        history.replaceState({}, document.title, window.location.pathname);
    }
});